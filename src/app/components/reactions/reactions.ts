import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { AriaDescriber, FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ESCAPE } from '@angular/cdk/keycodes';
import {
  OriginConnectionPosition,
  Overlay,
  OverlayConnectionPosition,
  OverlayRef,
  OverlayConfig,
  RepositionScrollStrategy,
  ScrollStrategy,
  ConnectionPositionPair,
  HorizontalConnectionPos,
  VerticalConnectionPos,
} from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { ComponentPortal } from '@angular/cdk/portal';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  Renderer2,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { reactions } from './reactions.model';
import { Output, EventEmitter } from '@angular/core';


export type ReactionsPosition = 'left' | 'right' | 'above' | 'below' | 'before' | 'after';

/** Time in ms to delay before changing the reactions visibility to hidden */
export const TOUCHEND_HIDE_DELAY = 1500;

/** Time in ms to throttle repositioning after scroll events. */
export const SCROLL_THROTTLE_MS = 20;

/** CSS class that will be attached to the overlay panel. */
export const REACTIONS_PANEL_CLASS = 'reactions-panel';

/** Creates an error to be thrown if the user supplied an invalid reactions position. */
export function getReactionsInvalidPositionError(position: string) {
  return Error(`Reactions position "${position}" is invalid.`);
}

/** Injection token that determines the scroll handling while a reactions is visible. */
export const REACTIONS_SCROLL_STRATEGY =
  new InjectionToken<() => ScrollStrategy>('reactions-scroll-strategy');

/** @docs-private */
export function REACTIONS_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay):
  () => RepositionScrollStrategy {
  return () => overlay.scrollStrategies.reposition({ scrollThrottle: SCROLL_THROTTLE_MS });
}

/**
 * An event used for datepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use MatDatepickerInputEvent instead.
 */
export class ReactionsChangeEvent {
  /** The new value for the target datepicker input. */
  value: string | null;

  constructor(public target: Reactions, public targetElement: HTMLElement) {
    this.value = this.target.value;
  }
}


/** @docs-private */
export const REACTIONS_SCROLL_STRATEGY_PROVIDER = {
  provide: REACTIONS_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: REACTIONS_SCROLL_STRATEGY_PROVIDER_FACTORY
};

@Directive({
  selector: '[reactions]',
  exportAs: 'reactions',
  host: {
    '(longpress)': 'show()',
    '(keydown)': '_handleKeydown($event)',
    '(touchend)': 'hide(' + TOUCHEND_HIDE_DELAY + ')',
  },
})
export class Reactions implements OnDestroy {
  _overlayRef: OverlayRef | null;
  _reactionsComponentInstance: ReactionsComponent | null;

  private _position: ReactionsPosition = 'below';
  private _disabled: boolean = false;
  private _reactionsClass: string | string[] | Set<string> | { [key: string]: any };

  @Output() reactionsChange = new EventEmitter<ReactionsChangeEvent>();

  /** Allows the user to define the position of the reactions relative to the parent element */
  @Input('reactionsPosition')
  get position(): ReactionsPosition { return this._position; }
  set position(value: ReactionsPosition) {
    if (value !== this._position) {
      this._position = value;


      if (this._reactionsComponentInstance) {
        this._disposeReactions();
      }
    }
  }



  /** Disables the display of the reactions. */
  @Input('reactionsDisabled')
  get disabled(): boolean { return this._disabled; }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);

    // If reactions is disabled, hide immediately.
    if (this._disabled) {
      this.hide(0);
    }
  }

  /** The default delay in ms before showing the reactions after show is called */
  @Input('reactionsShowDelay') showDelay = 0;

  /** The default delay in ms before hiding the reactions after hide is called */
  @Input('reactionsHideDelay') hideDelay = 0;

  private _value = '';

  /** The message to be displayed in the reactions */
  @Input('reactions') get value() { return this._value; }
  set value(value: string) {
    this._ariaDescriber.removeDescription(this._elementRef.nativeElement, this._value);

    // If the message is not a string (e.g. number), convert it to a string and trim it.
    this._value = value != null ? `${value}`.trim() : '';
    this._ariaDescriber.describe(this._elementRef.nativeElement, this.value);
  }

  /** Classes to be passed to the reactions. Supports the same syntax as `ngClass`. */
  @Input('reactionsClass')
  get reactionsClass() { return this._reactionsClass; }
  set reactionsClass(value: string | string[] | Set<string> | { [key: string]: any }) {
    this._reactionsClass = value;
    if (this._reactionsComponentInstance) {
      this._setReactionsClass(this._reactionsClass);
    }
  }

  private _enterListener: Function;
  private _leaveListener: Function;

  constructor(
    renderer: Renderer2,
    private _overlay: Overlay,
    private _elementRef: ElementRef,
    private _scrollDispatcher: ScrollDispatcher,
    private _viewContainerRef: ViewContainerRef,
    private _ngZone: NgZone,
    private _platform: Platform,
    private _ariaDescriber: AriaDescriber,
    private _focusMonitor: FocusMonitor,
    @Inject(REACTIONS_SCROLL_STRATEGY) private _scrollStrategy,
    @Optional() private _dir: Directionality) {

    // The mouse events shouldn't be bound on iOS devices, because
    // they can prevent the first tap from firing its click event.
    if (!_platform.IOS) {
      this._enterListener =
        renderer.listen(_elementRef.nativeElement, 'mouseenter', () => this.show());
      //this._leaveListener =
      //  renderer.listen(_elementRef.nativeElement, 'mouseleave', () => this.hide());
    }

    _focusMonitor.monitor(_elementRef.nativeElement, false).subscribe(origin => {
      // Note that the focus monitor runs outside the Angular zone.
      if (!origin) {
        _ngZone.run(() => this.hide(0));
      } else if (origin !== 'program') {
        _ngZone.run(() => this.show());
      }
    });
  }

  /**
   * Dispose the reactions when destroyed.
   */
  ngOnDestroy() {
    if (this._reactionsComponentInstance) {
      this._disposeReactions();
    }

    // Clean up the event listeners set in the constructor
    if (!this._platform.IOS) {
      this._enterListener();
      //this._leaveListener();
    }

    this._ariaDescriber.removeDescription(this._elementRef.nativeElement, this.value);
    this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
  }

  /** Shows the reactions after the delay in ms, defaults to reactions-delay-show or 0ms if no input */
  show(delay: number = this.showDelay): void {
    if (this.disabled || !this.value) { return; }

    if (!this._reactionsComponentInstance) {
      this._createReactions();
    }

    this._setReactionsClass(this._reactionsClass);
    this._reactionsComponentInstance!.show(this._position, delay);
  }

  /** Hides the reactions after the delay in ms, defaults to reactions-delay-hide or 0ms if no input */
  hide(delay: number = this.hideDelay): void {
    if (this._reactionsComponentInstance) {
      this._reactionsComponentInstance.hide(delay);
    }
  }

  /** Shows/hides the reactions */
  toggle(): void {
    this._isReactionsVisible() ? this.hide() : this.show();
  }

  /** Returns true if the reactions is currently visible to the user */
  _isReactionsVisible(): boolean {
    return !!this._reactionsComponentInstance && this._reactionsComponentInstance.isVisible();
  }

  /** Handles the keydown events on the host element. */
  _handleKeydown(e: KeyboardEvent) {
    if (this._isReactionsVisible() && e.keyCode === ESCAPE) {
      e.stopPropagation();
      this.hide(0);
    }
  }

  /** Create the reactions to display */
  private _createReactions(): void {
    let overlayRef = this._createOverlay();
    let portal = new ComponentPortal(ReactionsComponent, this._viewContainerRef);

    this._reactionsComponentInstance = overlayRef.attach(portal).instance;
    this._reactionsComponentInstance.afterSelectionChanged().subscribe((value) => {
      this.value = value;
      this.reactionsChange.emit(new ReactionsChangeEvent(this, this._elementRef.nativeElement))
      // Check first if the reactions has already been removed through this components destroy.
      if (this._reactionsComponentInstance) {
        this._disposeReactions();
      }
    })
    // Dispose the overlay when finished the shown reactions.
    this._reactionsComponentInstance!.afterHidden().subscribe(() => {
      // Check first if the reactions has already been removed through this components destroy.
      if (this._reactionsComponentInstance) {
        this._disposeReactions();
      }
    });
  }

  /** Create the overlay config and position strategy */
  private _createOverlay(): OverlayRef {
    const origin = this._getOrigin();
    const overlay = this._getOverlayPosition();

    // Create connected position strategy that listens for scroll events to reposition.
    const strategy = this._overlay
      .position()
      .connectedTo(this._elementRef, origin.main, overlay.main)
      .withFallbackPosition(origin.fallback, overlay.fallback);

    const scrollableAncestors = this._scrollDispatcher
      .getAncestorScrollContainers(this._elementRef);

    strategy.withScrollableContainers(scrollableAncestors);

    strategy.onPositionChange.subscribe(change => {
      if (this._reactionsComponentInstance) {
        if (change.scrollableViewProperties.isOverlayClipped && this._reactionsComponentInstance.isVisible()) {
          // After position changes occur and the overlay is clipped by
          // a parent scrollable then close the reactions.
          this.hide(0);
        } else {
          // Otherwise recalculate the origin based on the new position.
          this._reactionsComponentInstance._setTransformOrigin(change.connectionPair);
        }
      }
    });

    const config = new OverlayConfig({
      direction: this._dir ? this._dir.value : 'ltr',
      positionStrategy: strategy,
      panelClass: REACTIONS_PANEL_CLASS,
      scrollStrategy: this._scrollStrategy()
    });

    this._overlayRef = this._overlay.create(config);

    return this._overlayRef;
  }

  /** Disposes the current reactions and the overlay it is attached to */
  private _disposeReactions(): void {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;
    }

    this._reactionsComponentInstance = null;
  }

  /**
   * Returns the origin position and a fallback position based on the user's position preference.
   * The fallback position is the inverse of the origin (e.g. 'below' -> 'above').
   */
  _getOrigin(): { main: OriginConnectionPosition, fallback: OriginConnectionPosition } {
    const isDirectionLtr = !this._dir || this._dir.value == 'ltr';
    let position: OriginConnectionPosition;

    if (this.position == 'above' || this.position == 'below') {
      position = { originX: 'center', originY: this.position == 'above' ? 'top' : 'bottom' };
    } else if (this.position == 'left' ||
      this.position == 'before' && isDirectionLtr ||
      this.position == 'after' && !isDirectionLtr) {
      position = { originX: 'start', originY: 'center' };
    } else if (this.position == 'right' ||
      this.position == 'after' && isDirectionLtr ||
      this.position == 'before' && !isDirectionLtr) {
      position = { originX: 'end', originY: 'center' };
    } else {
      throw getReactionsInvalidPositionError(this.position);
    }

    const { x, y } = this._invertPosition(position.originX, position.originY);

    return {
      main: position,
      fallback: { originX: x, originY: y }
    };
  }

  /** Returns the overlay position and a fallback position based on the user's preference */
  _getOverlayPosition(): { main: OverlayConnectionPosition, fallback: OverlayConnectionPosition } {
    const isLtr = !this._dir || this._dir.value == 'ltr';
    let position: OverlayConnectionPosition;

    if (this.position == 'above') {
      position = { overlayX: 'start', overlayY: 'bottom' };
    } else if (this.position == 'below') {
      position = { overlayX: 'center', overlayY: 'top' };
    } else if (this.position == 'left' ||
      this.position == 'before' && isLtr ||
      this.position == 'after' && !isLtr) {
      position = { overlayX: 'end', overlayY: 'center' };
    } else if (this.position == 'right' ||
      this.position == 'after' && isLtr ||
      this.position == 'before' && !isLtr) {
      position = { overlayX: 'start', overlayY: 'center' };
    } else {
      throw getReactionsInvalidPositionError(this.position);
    }

    const { x, y } = this._invertPosition(position.overlayX, position.overlayY);

    return {
      main: position,
      fallback: { overlayX: x, overlayY: y }
    };
  }
  /** Updates the reactions class */
  private _setReactionsClass(reactionClass: string | string[] | Set<string> | { [key: string]: any }) {
    if (this._reactionsComponentInstance) {
      this._reactionsComponentInstance.reactionsClass = reactionClass;
      this._reactionsComponentInstance._markForCheck();
    }
  }

  /** Inverts an overlay position. */
  private _invertPosition(x: HorizontalConnectionPos, y: VerticalConnectionPos) {
    if (this.position === 'above' || this.position === 'below') {
      if (y === 'top') {
        y = 'bottom';
      } else if (y === 'bottom') {
        y = 'top';
      }
    } else {
      if (x === 'end') {
        x = 'start';
      } else if (x === 'start') {
        x = 'end';
      }
    }

    return { x, y };
  }
}

export type ReactionsVisibility = 'initial' | 'visible' | 'hidden';


@Component({
  selector: 'reactions-component',
  templateUrl: 'reactions.html',
  styleUrls: ['reactions.scss'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('state', [
      state('initial, void, hidden', style({ transform: 'scale(0)' })),
      state('visible', style({ transform: 'scale(1)' })),
      transition('* => visible', animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
      transition('* => hidden', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
    ])
  ],
  host: {
    '[style.zoom]': '_visibility === "visible" ? 1 : null',
    '(body:click)': 'this._handleBodyInteraction()',
    'aria-hidden': 'true',
  }
})
export class ReactionsComponent {

  public selectedChanged: Subject<string> = new Subject();


  /** Classes to be added to the reactions. Supports the same syntax as `ngClass`. */
  reactionsClass: string | string[] | Set<string> | { [key: string]: any };

  /** Message to display in the reactions */
  value: string;

  /** The timeout ID of any current timer set to show the reactions */
  _showTimeoutId: any;

  /** The timeout ID of any current timer set to hide the reactions */
  _hideTimeoutId: any;

  reactions = reactions;

  /** Property watched by the animation framework to show or hide the reactions */
  _visibility: ReactionsVisibility = 'initial';

  /** Whether interactions on the page should close the reactions */
  private _closeOnInteraction: boolean = false;

  /** The transform origin used in the animation for showing and hiding the reactions */
  _transformOrigin: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  /** Current position of the reactions. */
  private _position: ReactionsPosition;

  /** Subject for notifying that the reactions has been hidden from the view */
  private _onHide: Subject<any> = new Subject();

  constructor(private _changeDetectorRef: ChangeDetectorRef) { }

  /**
   * Shows the reactions with an animation originating from the provided origin
   * @param position Position of the reactions.
   * @param delay Amount of milliseconds to the delay showing the reactions.
   */
  show(position: ReactionsPosition, delay: number): void {
    // Cancel the delayed hide if it is scheduled
    if (this._hideTimeoutId) {
      clearTimeout(this._hideTimeoutId);
    }

    // Body interactions should cancel the reactions if there is a delay in showing.
    this._closeOnInteraction = true;
    this._position = position;
    this._showTimeoutId = setTimeout(() => {
      this._visibility = 'visible';

      // Mark for check so if any parent component has set the
      // ChangeDetectionStrategy to OnPush it will be checked anyways
      this._markForCheck();
    }, delay);
  }

  /**
   * Begins the animation to hide the reactions after the provided delay in ms.
   * @param delay Amount of milliseconds to delay showing the reactions.
   */
  hide(delay: number): void {
    // Cancel the delayed show if it is scheduled
    if (this._showTimeoutId) {
      clearTimeout(this._showTimeoutId);
    }

    this._hideTimeoutId = setTimeout(() => {
      this._visibility = 'hidden';

      // Mark for check so if any parent component has set the
      // ChangeDetectionStrategy to OnPush it will be checked anyways
      this._markForCheck();
    }, delay);
  }

  get selectedReaction() {
    return this.value;
  }

  set selectedReaction(key: string) {
    if (this.value !== key) {
      this.value = key;
      this.selectedChanged.next(key);
    }
  }

  /*selectedReaction(key: string) {
    if (this.value !== key) {
      this.value = key;
      this.selectedChanged.next(key);
    }
  }*/

  afterSelectionChanged(): Observable<string> {
    return this.selectedChanged.asObservable();
  }

  /** Returns an observable that notifies when the reactions has been hidden from view. */
  afterHidden(): Observable<void> {
    return this._onHide.asObservable();
  }

  /** Whether the reactions is being displayed. */
  isVisible(): boolean {
    return this._visibility === 'visible';
  }

  /** Sets the reactions transform origin according to the position of the reactions overlay. */
  _setTransformOrigin(overlayPosition: ConnectionPositionPair) {
    const axis = (this._position === 'above' || this._position === 'below') ? 'Y' : 'X';
    const position = axis == 'X' ? overlayPosition.overlayX : overlayPosition.overlayY;

    if (position === 'top' || position === 'bottom') {
      this._transformOrigin = position;
    } else if (position === 'start') {
      this._transformOrigin = 'left';
    } else if (position === 'end') {
      this._transformOrigin = 'right';
    } else {
      throw getReactionsInvalidPositionError(this._position);
    }
  }

  _animationStart() {
    this._closeOnInteraction = false;
  }

  _animationDone(event: AnimationEvent): void {
    const toState = event.toState as ReactionsVisibility;

    if (toState === 'hidden' && !this.isVisible()) {
      this._onHide.next();
    }

    if (toState === 'visible' || toState === 'hidden') {
      // Note: as of Angular 4.3, the animations module seems to fire the `start` callback before
      // the end if animations are disabled. Make this call async to ensure that it still fires
      // at the appropriate time.
      Promise.resolve().then(() => this._closeOnInteraction = true);
    }
  }

  _handleBodyInteraction(): void {
    if (this._closeOnInteraction) {
      this.hide(0);
    }
  }

  _markForCheck(): void {
    this._changeDetectorRef.markForCheck();
  }
}
