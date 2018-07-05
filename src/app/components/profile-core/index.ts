import { FileUploadModule } from 'ng2-file-upload/file-upload/file-upload.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';
import { UpdateImagePopup } from './update_image_popup';
import { ProfileWorkContactInfoPopup } from './profile_work_contact_info_popup';
import { ProfileWorkHistoryPopup } from './profile_work_history_popup';
import { ProfileEducationInfoPopup } from './profile_education_info_popup';
import { ProfilePersonalInfoPopup } from './profile_personal_info_popup';
import { ProfilePlaceInfoPopup } from './profile_place_info_popup';
import { ProfileSiteUrlPopup } from './profile_site_url_info_popup';
import { ProfileAddInfoPopup } from './add_info_popup';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatButtonModule, MatSelectModule, MatNativeDateModule, MatIconModule, MatInputModule, MatDialogModule, MatListModule } from '@angular/material';


@NgModule({
    imports: [
        FlexLayoutModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatButtonModule,
        MatDialogModule,
        MatListModule,
        FileUploadModule
    ],
    declarations: [
        UpdateImagePopup,
        ProfileWorkContactInfoPopup,
        ProfileWorkHistoryPopup,
        ProfileEducationInfoPopup,
        ProfilePersonalInfoPopup,
        ProfilePlaceInfoPopup,
        ProfileSiteUrlPopup,
        ProfileAddInfoPopup],
    entryComponents: [UpdateImagePopup,
        ProfileWorkContactInfoPopup,
        ProfileWorkHistoryPopup,
        ProfileEducationInfoPopup,
        ProfilePersonalInfoPopup,
        ProfilePlaceInfoPopup,
        ProfileSiteUrlPopup,
        ProfileAddInfoPopup]
})
export class ProfileCoreModule { }

