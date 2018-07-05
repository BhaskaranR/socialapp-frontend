import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {Emojipicker} from './emojipicker';


@Component({
  moduleId: module.id,
  selector: 'button[emojipickerToggle]',
  template: '',
  styleUrls: ['./emojipicker-toggle.scss'],
  host: {
    'type': 'button',
    'class': 'mat-emojipicker-toggle',
    '(click)': '_open($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmojipickerToggle {
  /** emojipicker instance that the button will toggle. */
  @Input('emojipickerToggle') emojipicker: Emojipicker;

  @Input('emojipickerToggle')
  get _emojipicker() { return this.emojipicker; }
  set _emojipicker(v: Emojipicker) { this.emojipicker = v; }


  _open(event: Event): void {
    if (this.emojipicker) {
      this.emojipicker.open();
      event.stopPropagation();
    }
  }
}
