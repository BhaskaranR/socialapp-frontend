import { Component } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'dialog-result-example-dialog',
  templateUrl: './add_info_popup.html'
})

export class ProfileAddInfoPopup {
  constructor(public dialogRef: MatDialogRef<ProfileAddInfoPopup>) {}
}