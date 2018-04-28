import {Component, NgModule} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material';
import {combineLatest} from 'rxjs';
import { MenuCategory, MenuItems } from '@app/shared/menu-items/menu-items';
import { ComponentPageTitle } from '@app/shared/page-title/page-title';

@Component({
  selector: 'app-components',
  templateUrl: './component-list.html',
  styleUrls: ['./component-list.scss']
})
export class ComponentList {
  category: MenuCategory;
  section: string;

  constructor(public docItems: MenuItems,
              private _componentPageTitle: ComponentPageTitle,
              private _route: ActivatedRoute,
              public router: Router) {
    combineLatest(_route.pathFromRoot.map(route => route.params), Object.assign)
      .subscribe(p => {
        this.category = docItems.getCategoryById(p['id']);
        this.section = p['section'];

        if (this.category) {
          this._componentPageTitle.title = this.category.name;
        } else {
          this.router.navigate(['../'], {relativeTo: this._route});
        }
      });
  }
}

@NgModule({
  imports: [ RouterModule, CommonModule, MatCardModule],
  exports: [ComponentList],
  declarations: [ComponentList],
  providers: [MenuItems, ComponentPageTitle],
})
export class ComponentListModule { }
