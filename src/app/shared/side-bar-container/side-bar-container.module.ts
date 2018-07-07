import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { SideBarContainer } from './side-bar-container';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [SideBarContainer],
  exports: [SideBarContainer],
  entryComponents: [SideBarContainer],
})
export class SideBarContainerModule { }
