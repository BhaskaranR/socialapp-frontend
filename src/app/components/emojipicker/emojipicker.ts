import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnDestroy,
  Optional,
  Output,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  NgZone,
} from '@angular/core';

import 'rxjs/add/operator/first';
import {Subscription} from 'rxjs/Subscription';
import { EmojiContainer } from './emojicontainer/emojicontainer.component';
import { EmojipickerInput } from './emoji-input';
import { MatDialogRef, MatDialog,  MatDialogConfig } from '@angular/material';
import { Dir } from "@angular/cdk/bidi";
import { ComponentPortal } from "@angular/cdk/portal";
import { ESCAPE } from "@angular/cdk/keycodes";
import { OverlayRef } from "@angular/cdk/overlay";
import { PositionStrategy } from "@angular/cdk/overlay";
import { Overlay } from "@angular/cdk/overlay";
import { OverlayConfig } from '@angular/cdk/overlay';
import { OriginConnectionPosition } from '@angular/cdk/overlay';
import { InjectionToken, Inject } from '@angular/core';
import { ScrollStrategy } from '@angular/cdk/overlay';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';

/** Injection token that determines the scroll handling while the calendar is open. */
export const MAT_EMOJIPICKER_SCROLL_STRATEGY =
new InjectionToken<() => ScrollStrategy>('mat-emojipicker-scroll-strategy');


/** @docs-private */
export function MAT_EMOJIPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay):
() => RepositionScrollStrategy {
return () => overlay.scrollStrategies.reposition();
}

/** @docs-private */
export const MAT_EMOJIPICKER_SCROLL_STRATEGY_PROVIDER = {
provide: MAT_EMOJIPICKER_SCROLL_STRATEGY,
deps: [Overlay],
useFactory: MAT_EMOJIPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY,
};


/** Used to generate a unique ID for each emojipicker instance. */
let emojipickerUid = 0;
@Component({
  moduleId: module.id,
  selector: 'emojipicker-content',
  templateUrl: './emojipicker-content.html',
  styleUrls: ['./emojipicker-content.scss'],
  host: {
    'class': 'mat-emojipicker-content',
    '(keydown)': '_handleKeydown($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmojipickerContent {
  emojipicker: Emojipicker;

  @ViewChild(EmojiContainer) _input: EmojiContainer;

  /**
   * Handles keydown event on emojipicker content.
   * @param event The event.
   */
  _handleKeydown(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case ESCAPE:
        this.emojipicker.close();
        break;
      default:
        // Return so that we don't preventDefault on keys that are not explicitly handled.
        return;
    }

    event.preventDefault();
  }
}



@Component({
  moduleId: module.id,
  selector: 'emojipicker',
  template: '',
})
export class Emojipicker implements OnDestroy {

  /**
   * Whether the emojipicker UI is in touch mode. In touch mode the emojipicker opens in a dialog rather
   * than a popup and elements have more padding to allow for bigger touch targets.
   */
  @Input() touchUi = false;

  /** Emits new selected date when selected date changes. */
  @Output() selectedChanged = new EventEmitter();

  /** Whether the emojipicker is open. */
  opened = false;

  /** The id for the emojipicker input. */
  id = `emojipicker-${emojipickerUid++}`;


  /** A reference to the overlay when the emojicontainer is opened as a popup. */
  private _popupRef: OverlayRef;

  /** A reference to the dialog when the emojicontainer is opened as a dialog. */
  private _dialogRef: MatDialogRef<any>;

  /** A portal containing the calendar for this emojipicker. */
  private _emojiPortal: ComponentPortal<EmojipickerContent>;

    /** The input element this emojipicker is associated with. */
  private _emojiPickerInput: EmojipickerInput;

  private _inputSubscription: Subscription;

  constructor(private _dialog: MatDialog,
              private _overlay: Overlay,
              private _ngZone: NgZone,
              @Inject(MAT_EMOJIPICKER_SCROLL_STRATEGY) private _scrollStrategy,
              private _viewContainerRef: ViewContainerRef,
              @Optional() private _dir: Dir) {
  }

  ngOnDestroy() {
    this.close();
    if (this._popupRef) {
      this._popupRef.dispose();
    }
    if (this._inputSubscription) {
      this._inputSubscription.unsubscribe();
    }
  }

   /**
   * Register an input with this emojipicker.
   * @param input The emojipicker input to register with this emojipicker.
   */
  _registerInput(input: EmojipickerInput): void {
    if (this._emojiPickerInput) {
      throw Error('An Emojipicker can only be associated with a single input.');
    }
    this._emojiPickerInput = input;
   // this._inputSubscription =
   //     this._emojiPickerInput._valueChange.subscribe((value: string) => this._selected = value);
      
  }




  _select(emoji): void {
    
      this.selectedChanged.emit(emoji);
  }


  /** Open the calendar. */
  open(): void {
    if (this.opened) {
      return;
    }
    this.touchUi ? this._openAsDialog() : this._openAsPopup();
    this.opened = true;
  }

  /** Close the calendar. */
  close(): void {
    if (!this.opened) {
      return;
    }
    if (this._popupRef && this._popupRef.hasAttached()) {
      this._popupRef.detach();
    }
    if (this._dialogRef) {
      this._dialogRef.close();
      this._dialogRef = null;
    }
    if (this._emojiPortal && this._emojiPortal.isAttached) {
      this._emojiPortal.detach();
    }
    this.opened = false;
  }

  /** Open the emojis as a dialog. */
  private _openAsDialog(): void {
    let config = new MatDialogConfig();
    config.viewContainerRef = this._viewContainerRef;

    this._dialogRef = this._dialog.open(EmojipickerContent, config);
    this._dialogRef.afterClosed().subscribe(() => this.close());
    this._dialogRef.componentInstance.emojipicker = this;
  }

  /** Open the calendar as a popup. */
  private _openAsPopup(): void {
    if (!this._emojiPortal) {
      this._emojiPortal = new ComponentPortal(EmojipickerContent, this._viewContainerRef);
    }

    if (!this._popupRef) {
      this._createPopup();
    }

    if (!this._popupRef.hasAttached()) {
      let componentRef: ComponentRef<EmojipickerContent> =
          this._popupRef.attach(this._emojiPortal);
      componentRef.instance.emojipicker = this;

      // Update the position once the calendar has rendered.
      this._ngZone.onStable.first().subscribe(() => this._popupRef.updatePosition());
    }

    this._popupRef.backdropClick().subscribe(() => this.close());
  }


  /** Create the popup. */
  private _createPopup(): void {
    const overlayState = new OverlayConfig({
      positionStrategy: this._createPopupPositionStrategy(),
      hasBackdrop: true,
      backdropClass: 'mat-overlay-transparent-backdrop',
      direction: this._dir ? this._dir.value : 'ltr',
      scrollStrategy: this._scrollStrategy()
    });

    this._popupRef = this._overlay.create(overlayState);
  }

  /** Create the popup PositionStrategy. */
  private _createPopupPositionStrategy(): PositionStrategy {
    return this._overlay.position()
      .connectedTo(this._emojiPickerInput.getPopupConnectionElementRef(),
        {originX: 'start', originY: 'bottom'},
        {overlayX: 'start', overlayY: 'top'}
      )
      .withFallbackPosition(
        { originX: 'start', originY: 'top' },
        { overlayX: 'start', overlayY: 'bottom' }
      )
      .withFallbackPosition(
        {originX: 'end', originY: 'bottom'},
        {overlayX: 'end', overlayY: 'top'}
      )
      .withFallbackPosition(
        { originX: 'end', originY: 'top' },
        { overlayX: 'end', overlayY: 'bottom' }
      );
  }
}
