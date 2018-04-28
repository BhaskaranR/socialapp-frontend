import {CommonModule} from '@angular/common';
import {
  Component,
  ElementRef,
  NgModule,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  OnDestroy
} from '@angular/core';
import {MatTabsModule} from '@angular/material';
import {ActivatedRoute, Params, Router, RouterModule} from '@angular/router';
import {ComponentPageTitle} from '@app/shared/page-title/page-title';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Subject, Subscription, Observable, combineLatest} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import { MenuItems, MenuItem } from '@app/shared/menu-items/menu-items';

@Component({
  selector: 'app-component-viewer',
  templateUrl: './component-viewer.html',
  styleUrls: ['./component-viewer.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ComponentViewer implements OnDestroy {
  componentDocItem: MenuItem;
  sections: Set<string> = new Set(['overview', 'api']);
  private _subscription: Subscription;
  private _destroyed = new Subject();

  constructor(private _route: ActivatedRoute,
              private router: Router,
              public _componentPageTitle: ComponentPageTitle,
              public menuItems: MenuItems,
              ) {
    // Listen to changes on the current route for the doc id (e.g. button/checkbox) and the
    // parent route for the section (material/cdk).
    combineLatest(_route.params, _route.parent.params).pipe(
        map((p: [Params, Params]) => ({id: p[0]['id'], section: p[1]['section']})),
        map(p => ({doc: menuItems.getItemById(p.id, p.section), section: p.section}),
        takeUntil(this._destroyed))
        ).subscribe(d => {
          this.componentDocItem = d.doc;
          if (this.componentDocItem) {
            this._componentPageTitle.title = `${this.componentDocItem.name}`;
          } else {
            this.router.navigate(['/' + d.section]);
          }
        });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }
}

@Component({
  selector: 'component-overview',
  templateUrl: './component-overview.html',
  encapsulation: ViewEncapsulation.None,
})
export class ComponentOverview implements OnInit {
  @ViewChild('intialFocusTarget') focusTarget: ElementRef;
  showToc: Observable<boolean>;

  constructor(public componentViewer: ComponentViewer, breakpointObserver: BreakpointObserver) {
    this.showToc = breakpointObserver.observe('(max-width: 1200px)')
      .pipe(map(result => !result.matches));
  }

  ngOnInit() {
    // 100ms timeout is used to allow the page to settle before moving focus for screen readers.
    setTimeout(() => this.focusTarget.nativeElement.focus(), 100);
  }

}

@Component({
  selector: 'component-api',
  templateUrl: './component-api.html',
  styleUrls: ['./component-api.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ComponentApi extends ComponentOverview {}

@Component({
  selector: 'component-examples',
  templateUrl: './component-examples.html',
  encapsulation: ViewEncapsulation.None,
})
export class ComponentExamples extends ComponentOverview {}

@NgModule({
  imports: [
    MatTabsModule,
    RouterModule,
    CommonModule,
  ],
  exports: [ComponentViewer],
  declarations: [ComponentViewer, ComponentOverview, ComponentApi, ComponentExamples],
  providers: [MenuItems, ComponentPageTitle],
})
export class ComponentViewerModule {}
