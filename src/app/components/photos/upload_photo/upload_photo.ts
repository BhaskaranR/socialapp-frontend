import { Component } from '@angular/core';
import { MatDialogRef} from '@angular/material';

@Component({
	selector: 'app-upload-photo',
	templateUrl: './upload_photo.html'
})

export class UploadPhotoComponent {
	
	constructor
	(
		public dialogRef: MatDialogRef<UploadPhotoComponent>
	) 
	{

	}

	ngOnInit() {

	}
}


