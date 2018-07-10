import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { MentionDirective } from './mention.directive';
import { MentionListComponent } from './mention-list.component';
import { MatSelectModule, MatCardModule } from '@angular/material';
import { MentionPipe } from './mentiontransform';


@NgModule({
    imports: [
        CommonModule,
        MatSelectModule,
        MatCardModule
    ],
    exports: [
        MentionDirective,
        MentionListComponent,
        MentionPipe
    ],
    entryComponents: [
        MentionListComponent
    ],
    declarations: [
        MentionDirective,
        MentionListComponent,
        MentionPipe
    ]
})
export class MentionModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MentionModule
        };
    }
}
