import { Subscription } from 'rxjs/Rx';
import { Component, ElementRef, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FileUploader, Headers } from 'ng2-file-upload';
import { AuthHttp } from 'angular2-jwt';

// import * as profileActions from '../../core/profile-data/profile.action';
// import * as fromRoot from '../../reducers';
// import { PhotoDetails } from '../../core/file.model';

@Component({
  selector: 'dialog-result-example-dialog',
  templateUrl: './update_image_popup.html',
  styleUrls: ['./update_image_popup.css']
})
export class UpdateImagePopup implements OnInit {
  get user() {
    return this.data;
  }
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean = false;
  hasAnotherDropZoneOver: boolean = false;
  @ViewChild('fileInput') fileInput: ElementRef;
  image$: Subscription;
  image: any// PhotoDetails;
  constructor(public dialogRef: MatDialogRef < UpdateImagePopup > ,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject('apiBase') private apiBase: string,) {}
    ngOnInit() {
      // let tokens = JSON.parse(localStorage.getItem('tokens'));
      // if (tokens) {
      //   let authHeaders: Headers = { name: 'authorization', value: `Bearer${tokens.access_token}` };
      //   this.uploader = new FileUploader({ url: `${this.apiBase}/users/bgimage`, headers: [authHeaders], disableMultipart: false });
      // }
      // this.uploader.onAfterAddingAll = f => {
      //   this.uploader.uploadAll();
      // };
      // this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
      //   const resp = JSON.parse(response);
      //    const image : PhotoDetails= {
      //     small : resp.images.small,
      //     normal: resp.images.normal,
      //     key: resp.images.key,
      //     large:'',
      //     xlarge: '',
      //     ext: resp.images.normal.substring(resp.images.normal.indexOf(".") +1)
      //   }
      //   this.store.dispatch(new profileActions.UpdateProfileBGImageSuccessAction(image));
      //};
    }
      uploadClick(event: Event) {
    //  this.fileInput.nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: false }));
    //  event.preventDefault();
   }
}
