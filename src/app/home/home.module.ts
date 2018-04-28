import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { CoreModule } from '@app/core';
import { RoutingModule } from './home.routing';
import { HomeComponent } from './home.component';
import { StaticModule } from '@app/static';
import { ComponentCategoryListModule } from '@app/home/pages/component-category-list/component-category-list';
import { ComponentHeaderModule } from '@app/home/pages/component-page-header/component-page-header';
import { MenuItems } from '@app/shared/menu-items/menu-items';
import { ComponentListModule } from '@app/home/pages/component-list';
import { ComponentSidenavModule } from '@app/home/pages/component-sidenav/component-sidenav';
import { ComponentViewerModule } from '@app/home/pages/component-viewer/component-viewer';
import { NavBarModule } from '@app/shared/navbar/navbar';
import { TableOfContentsModule } from '@app/shared/table-of-contents/table-of-contents.module';


@NgModule({
  imports: [
    SharedModule,
    RoutingModule,
    StaticModule,
    ComponentCategoryListModule,
    ComponentHeaderModule,
    ComponentListModule,
    ComponentSidenavModule,
    NavBarModule,
    ComponentViewerModule,
    TableOfContentsModule
  ],
  declarations: [HomeComponent],
  providers:[
    MenuItems
  ]
})
export class HomeModule {}
