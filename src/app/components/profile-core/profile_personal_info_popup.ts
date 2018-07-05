import { Component, Inject, Optional } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormArray, FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'dialog-result-example-dialog',
  templateUrl: './profile_personal_info_popup.html',
  styleUrls: ['./profile_education_info_popup.css']
})

export class ProfilePersonalInfoPopup {
  public personalForm: FormGroup;
  public bDay: string = '';
  get birthday(): FormArray {
    return <FormArray > this.personalForm.get('birthday');
  }
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef < ProfilePersonalInfoPopup > ,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit() {
    if (this.data) {
       this.personalForm = this.fb.group({
      gender: [this.data.gender, [Validators.required]],
      birthday: [this.data.birthday, [Validators.required]],
      occupation: [this.data.occupation, [Validators.required]]
    });
    if(this.data.birthday){
      this.bDay = this.data.birthday;
    }

    }else{
       this.personalForm = this.fb.group({
      gender: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      occupation: ['', [Validators.required]]
    });
    }

  }
  updateDate(date) {
    this.birthday.patchValue(date.value);
  }
}

