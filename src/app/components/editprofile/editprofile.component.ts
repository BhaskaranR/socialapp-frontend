import {Component} from '@angular/core';
import { MatDialogRef, MatDialog} from '@angular/material';
// import { UploadPhotoComponent } from '../photos/upload_photo/upload_photo';


@Component({
	selector: 'editprofile',
	templateUrl: './editprofile.component.html',
	styleUrls: ['./editprofile.css']
})

export class EditProfileComponent {
	constructor
	(
		public dialogRef: MatDialogRef<EditProfileComponent>,
		public dialog: MatDialog
	) 
	{	}

	openUploadPhoto() {
		// this.dialog.open(UploadPhotoComponent, {
		// 	width: '70px',
		// 	height: '70px'
		// });
	}

}
