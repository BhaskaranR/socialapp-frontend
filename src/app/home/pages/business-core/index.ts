import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { MatDialogModule, MatSelectModule, MatMenuModule, MatToolbarModule, MatInputModule, MatStepperModule, MatButtonModule, MatIconModule, MatAutocompleteModule, MatCardModule, MatTabsModule, MatSidenavModule, MatCheckboxModule, MatListModule } from '@angular/material';
import { AddBusinessComponent } from './components/add_business/addbusiness';
import { BusinessListComponent } from './components/business-list/business-list.component';
import { BusinessCardComponent } from './components/business-card/business-card.component';
import { MatSliderModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BusinessMapComponent } from './components/business-map/business-map.component';
import { AvatarModule } from 'ngx-avatar';
import { environment } from '@env/environment';

const components = [
  AddBusinessComponent,
  BusinessListComponent,
  BusinessCardComponent,
  BusinessMapComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpModule,
    FlexLayoutModule,
    AvatarModule,
    AgmCoreModule.forRoot({
      libraries: ['places'],
      apiKey: environment.google_map_key
    }),
    MatSliderModule,
    MatCheckboxModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatStepperModule,
    MatAutocompleteModule
  ],
  declarations: components,
  exports: components,
  entryComponents:[AddBusinessComponent]
})
export class BusinessCoreModule { }
