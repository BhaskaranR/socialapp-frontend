import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { Parallax } from './parallax.directive';


@NgModule({
  imports: [CommonModule],
  declarations: [
    Parallax
  ],
  exports: [
    Parallax
  ],
})
export class ParallaxModule {
}