import {Component, EventEmitter, NgModule, Output} from '@angular/core';
import {ComponentPageTitle} from '@app/shared/page-title/page-title';
import {MatButtonModule, MatIconModule} from '@angular/material';

@Component({
  selector: 'component-page-header',
  templateUrl: './component-page-header.html',
  styleUrls: ['./component-page-header.scss']
})
export class ComponentPageHeader {
  constructor(public _componentPageTitle: ComponentPageTitle) {}

  @Output() toggleSidenav = new EventEmitter<void>();

  getTitle() {
    return this._componentPageTitle.title;
  }
}

@NgModule({
  imports: [MatButtonModule, MatIconModule],
  exports: [ComponentPageHeader],
  declarations: [ComponentPageHeader],
  providers: [ComponentPageTitle],
})
export class ComponentHeaderModule { }
