import {
  Component, Input, NgZone, ViewEncapsulation, ViewChild, OnInit, NgModule, OnDestroy, ChangeDetectionStrategy
} from '@angular/core';
import {MatSidenav, MatSidenavModule, MatIconModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute, Params, Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ComponentHeaderModule} from '../component-page-header/component-page-header';
import {Observable, Subject, combineLatest} from 'rxjs';
import {switchMap, takeUntil, startWith} from 'rxjs/operators';
import {trigger, animate, state, style, transition} from '@angular/animations';
import { MenuItems } from '@app/shared/menu-items/menu-items';
import { routerTransition } from '@app/core';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-component-sidenav',
  templateUrl: './component-sidenav.html',
  styleUrls: ['./component-sidenav.scss'],
  animations: [routerTransition],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ComponentSidenav implements OnInit {
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  params: Observable<Params>;

  constructor(public menuItems: MenuItems,
              private _route: ActivatedRoute,
              private _router: Router,
              zone: NgZone) {
    this.mediaMatcher.addListener(mql => zone.run(() => this.mediaMatcher = mql));
  }

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  ngOnInit() {
    this._router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    });

    // Combine params from all of the path into a single object.
    this.params = combineLatest(
      this._route.pathFromRoot.map(route => {
        return route.params
      }),
      Object.assign);
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
}

@Component({
  selector: 'app-component-nav',
  templateUrl: './component-nav.html',
  animations: [
    trigger('bodyExpansion', [
      state('collapsed', style({height: '0px', display: 'none'})),
      state('expanded', style({height: '*', display: 'block'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
    ]),
  ],
})
export class ComponentNav implements OnInit, OnDestroy {

  @Input() params: Observable<Params>;
  expansions = {};
  private _onDestroy = new Subject<void>();

  constructor(public menuItems: MenuItems,
              private _router: Router) { }

  ngOnInit() {
    this._router.events.pipe(
      startWith(null),
      switchMap(() => this.params),
      takeUntil(this._onDestroy)
    ).subscribe(p => this.setExpansions(p));
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /** Set the expansions based on the route url */
  setExpansions(params: Params) {
    const categories = this.menuItems.getCategories(params.section);
    for (const category of (categories || [])) {
      if (this.expansions[category.id] === true) {
        continue;
      }

      let match = false;
      for (const item of category.items) {
        if (this._router.url.indexOf(item.id) > -1) {
          match = true;
          break;
        }
      }

      if (this.expansions[category.id] === false) {
        this.expansions[category.id] = match;
      }
    }
  }

  /** Gets the expanded state */
  _getExpandedState(category: string) {
    return this.getExpanded(category) ? 'expanded' : 'collapsed';
  }

  /** Toggles the expanded state */
  toggleExpand(category: string) {
    this.expansions[category] = !this.expansions[category];
  }

  /** Gets whether expanded or not */
  getExpanded(category: string): boolean {
    return this.expansions[category] === undefined ? true : this.expansions[category];
  }

}


@NgModule({
  imports: [
    MatSidenavModule,
    RouterModule,
    CommonModule,
    ComponentHeaderModule,
    BrowserAnimationsModule,
    MatIconModule,
  ],
  exports: [ComponentSidenav],
  declarations: [ComponentSidenav, ComponentNav],
  providers: [MenuItems],
})
export class ComponentSidenavModule {}
