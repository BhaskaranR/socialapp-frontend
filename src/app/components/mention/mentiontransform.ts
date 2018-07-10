import { Pipe, PipeTransform } from '@angular/core';
import * as EmojiOne from 'emojione';
EmojiOne.ascii = true; // (default: false)

@Pipe({name: 'mention'})
export class MentionPipe implements PipeTransform {
  transform(text: string): any {
    const pattern = /@.([^\s]+).([^\s]+)/gi;
    var clearText = text.replace(pattern,'')
    return clearText;
  }
}
