import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatDialogModule,
    MatButtonModule,
    MatIconModule
} from '@angular/material';
import { Emojipicker, EmojipickerContent, MAT_EMOJIPICKER_SCROLL_STRATEGY_PROVIDER } from './emojipicker';
import { EmojipickerInput } from './emoji-input';
import { EmojipickerToggle } from './emojipicker-toggle';
import { EmojiService } from './emoji.service';
import { EmojiContainer } from './emojicontainer/emojicontainer.component';
import { OverlayModule } from '@angular/cdk/overlay';

export * from './emoji-input';
export * from './emojipicker';
export * from './emojipicker-toggle';
export * from './emojicontainer/emojicontainer.component';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    OverlayModule,
    FlexLayoutModule
  ],
  exports: [
    Emojipicker,
    EmojipickerContent,
    EmojipickerInput,
    EmojipickerToggle,
    EmojiContainer
  ],
  declarations: [
   Emojipicker,
    EmojipickerContent,
    EmojipickerInput,
    EmojipickerToggle,
    EmojiContainer
  ],
  entryComponents: [
      EmojipickerContent,
  ],
  providers :[EmojiService,
    MAT_EMOJIPICKER_SCROLL_STRATEGY_PROVIDER
  ]
})
export class EmojipickerModule {}
