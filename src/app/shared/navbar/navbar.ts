import { Component, NgModule, Output, EventEmitter } from '@angular/core';
import {CommonModule} from '@angular/common';
import { MatButtonModule, MatMenuModule, MatIconModule } from '@angular/material';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { SECTIONS } from '@app/shared/menu-items/menu-items';
import { MatToolbarModule } from '@angular/material/toolbar';

const SECTIONS_KEYS = Object.keys(SECTIONS);

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavBar {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  logo = require('../../../assets/logo.png');

  @Output() logout = new EventEmitter();
  
  get sections() {
    return SECTIONS;
  }

  get sectionKeys() {
    return SECTIONS_KEYS;
  }

  gotoSection(key) {
    this.router.navigate([`/${key}`], {
      relativeTo: this.route
    })
  }
}

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule,
    MatToolbarModule,
    CommonModule
  ],
  exports: [NavBar],
  declarations: [NavBar],
})
export class NavBarModule {}
