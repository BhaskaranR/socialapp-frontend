import { Injectable } from '@angular/core';
import { EMOJI_DB } from './emoji.db';

@Injectable()
export class EmojiService {

  PARSE_REGEX = /:([a-zA-Z0-9_\-\+]+):/g;

    get(emoji) {
      // TODO Fix performance

    return EMOJI_DB;
  }

  getAll() {
    return EMOJI_DB;
  }

  emojify(str) {
    return str.split(this.PARSE_REGEX).map((emoji, index) => {
      // Return every second element as an emoji
      if (index % 2 === 0) { return emoji; }
      return this.get(emoji);
    }).join('');
  }

}
