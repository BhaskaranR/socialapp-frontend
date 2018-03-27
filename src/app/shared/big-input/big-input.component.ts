import { Component, Input } from '@angular/core';

@Component({
  selector: 'ksoc-big-input',
  templateUrl: './big-input.component.html',
  styleUrls: ['./big-input.component.scss']
})
export class BigInputComponent {
  @Input() placeholder: string;

  @Input() value = '';
  @Input() disabled = false;

  hasFocus = false;
}
