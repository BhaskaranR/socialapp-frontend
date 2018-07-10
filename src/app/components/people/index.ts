import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleCardComponent } from './people-card/people-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { AvatarModule } from 'ngx-avatar';


const components = [
    PeopleListComponent,
    PeopleCardComponent, 
  ];

@NgModule({
  imports: [
    CommonModule,
    AvatarModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: components,
  exports: components
})
export class PeopleModule {}
