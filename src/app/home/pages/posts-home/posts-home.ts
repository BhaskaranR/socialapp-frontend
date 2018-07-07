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
import {ActivatedRoute, Params, Router, RouterModule} from '@angular/router';
import {ComponentPageTitle} from '@app/shared/page-title/page-title';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Subject, Subscription, Observable, combineLatest} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import { MenuItems, MenuItem } from '@app/shared/menu-items/menu-items';
import { ComponentViewer } from '@app/shared/component.viewer';

@Component({
  selector: 'app-posts-home',
  templateUrl: './posts-home.html',
  styleUrls: ['./posts-home.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostsHome extends ComponentViewer implements OnDestroy {
  componentDocItem: MenuItem;
  sections: Set<string> = new Set(['Featured', 'Photos', 'Videos']);
  private _subscription: Subscription;
  private _destroyed = new Subject();

  constructor(private _route: ActivatedRoute,
              private router: Router,
              public _componentPageTitle: ComponentPageTitle,
              public menuItems: MenuItems,
              breakpointObserver: BreakpointObserver
              ) {
                super(breakpointObserver);
    // Listen to changes on the current route for the doc id (e.g. button/checkbox) and the
    // parent route for the section (material/cdk).
    // combineLatest(_route.params, _route.parent.params).pipe(
    //     map((p: [Params, Params]) => ({id: p[0]['id'], section: p[1]['section']})),
    //     map(p => ({doc: menuItems.getItemById(p.id, p.section), section: p.section}),
    //     takeUntil(this._destroyed))
    //     ).subscribe(d => {
    //       this.componentDocItem = d.doc;
    //       if (this.componentDocItem) {
    //         this._componentPageTitle.title = `${this.componentDocItem.name}`;
    //       } else {
    //         this.router.navigate(['/' + d.section]);
    //       }
    //     });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }
}
