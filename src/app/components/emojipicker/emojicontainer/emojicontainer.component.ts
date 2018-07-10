import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';

import { EmojiService } from '../emoji.service';
import { NgZone, ElementRef } from '@angular/core';

@Component({
  selector: 'emoji-container',
  templateUrl : './emojicontainer.component.html',
  host: {
    'class': 'mat-emojicontainer'
  },
  styleUrls:['./emojicontainer.component.scss']
})
export class EmojiContainer {

  @Output() selectedChange: any = new EventEmitter();
  @ViewChild('textAreaEl') textAreaEl;
  @ViewChild('inputTag') inputTag;

  public filterEmojis: string = '';
  public filteredEmojis: any[];
  public allEmojis: Array<any>;
  public popupOpen: boolean = false;

  constructor(
      private _elementRef: ElementRef,
      private _ngZone: NgZone,
      public emojiService: EmojiService) {
  }

  ngOnInit() {
    this.allEmojis = this.emojiService.getAll();
  }

    /** Focuses the active cell after the microtask queue is empty. */
  _focusActiveCell() {
    this._ngZone.runOutsideAngular(() => this._ngZone.onStable.first().subscribe(() => {
      //todo
    //  let activeEl = this._elementRef.nativeElement.querySelector('.mat-emojicontainer-body-active');
    //  activeEl.focus();
    }));
  }

  clean() {
    this.filterEmojis = '';
    this.filteredEmojis = this.getFilteredEmojis();
  }

  updateFilteredEmojis() {
     this.filteredEmojis = this.getFilteredEmojis();
  }
  getFilteredEmojis() {
    return this.allEmojis.filter((e) => {
      if (this.filterEmojis === '') {
        return true;
      } else {
        for (let alias of e.aliases) {
          if (alias.includes(this.filterEmojis)) {
            return true;
          }
        }
      }
      return false;
    });
  }

  onEmojiClick(e) {
    this.selectedChange.emit(e);
  }
}
