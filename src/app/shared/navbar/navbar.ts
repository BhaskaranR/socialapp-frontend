import { Component, NgModule, Output, EventEmitter } from '@angular/core';
import {CommonModule} from '@angular/common';
import { MatButtonModule, MatMenuModule, MatIconModule } from '@angular/material';
import {RouterModule} from '@angular/router';
import { SECTIONS } from '@app/shared/menu-items/menu-items';

const SECTIONS_KEYS = Object.keys(SECTIONS);

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavBar {


  logo = require('../../../assets/logo.png');

  @Output() logout = new EventEmitter();

  @Output() settings = new EventEmitter();
  
  get sections() {
    return SECTIONS;
  }

  get sectionKeys() {
    return SECTIONS_KEYS;
  }
}

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule,
    CommonModule
  ],
  exports: [NavBar],
  declarations: [NavBar],
})
export class NavBarModule {}
