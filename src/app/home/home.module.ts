import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { CoreModule } from '@app/core';
import { RoutingModule } from './home.routing';
import { HomeComponent } from './home.component';
import { StaticModule } from '@app/static';
import { ComponentCategoryListModule } from '@app/home/component-category-list/component-category-list';
import { ComponentHeaderModule } from '@app/home/component-page-header/component-page-header';
import { MenuItems } from '@app/shared/menu-items/menu-items';
import { ComponentListModule } from '@app/home/component-list';
import { ComponentSidenavModule } from '@app/home/component-sidenav/component-sidenav';
import { NavBarModule } from '@app/shared/navbar/navbar';
import { PostsHomeModule } from '@app/home/pages/posts-home/posts-home.module';
import { SideBarContainerModule } from '../shared/side-bar-container/side-bar-container.module';


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
    PostsHomeModule,
    SideBarContainerModule
  ],
  declarations: [HomeComponent],
  providers:[
    MenuItems
  ]
})
export class HomeModule {}
