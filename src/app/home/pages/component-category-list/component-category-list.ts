import {Component, NgModule, OnDestroy, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Params, RouterModule} from '@angular/router';
import {Observable, combineLatest, Subscription} from 'rxjs';
import { MenuItems, SECTIONS } from '@app/shared/menu-items/menu-items';


@Component({
  selector: 'app-component-category-list',
  templateUrl: './component-category-list.html',
  styleUrls: ['./component-category-list.scss']
})
export class ComponentCategoryList implements OnInit, OnDestroy {
  params: Observable<Params>;
  routeParamSubscription: Subscription;

  constructor(public docItems: MenuItems,
              private _route: ActivatedRoute) {}

  ngOnInit() {
    // Combine params from all of the path into a single object.
    this.params = combineLatest(
      this._route.pathFromRoot.map(route => route.params),
      Object.assign);

    // title on topbar navigation
    this.routeParamSubscription = this.params.subscribe(params => {
      const sectionName = params['section'];
    });
  }

  ngOnDestroy() {
    this.routeParamSubscription.unsubscribe();
  }
}

@NgModule({
  imports: [ MatCardModule, CommonModule, RouterModule],
  exports: [ComponentCategoryList],
  declarations: [ComponentCategoryList],
  providers: [MenuItems],
})
export class ComponentCategoryListModule { }
