import { Component, Inject, OnInit, Optional } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {MatDialog, MatDialogRef} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup,FormArray,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'dialog-result-example-dialog',
  templateUrl: './profile_education_info_popup.html',
  styleUrls: ['./profile_education_info_popup.css']
})

export class ProfileEducationInfoPopup implements OnInit {
  public educationForm: FormGroup;
  get schoolInfo(): FormArray{
    return <FormArray>this.educationForm.get('schoolInfo');
  }
  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef < ProfileEducationInfoPopup >,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit() {
    if(this.data){
      this.educationForm = this.formBuilder.group({
            schoolInfo: this.formBuilder.array([])
    });
      this.data.map(e => {
        this.schoolInfo.push(this.updateSchool(e));
      });
    } else {
      this.educationForm = this.formBuilder.group({
            schoolInfo: this.formBuilder.array([this.initSchool()])
      });
      }
  }
  initSchool() {
    return this.formBuilder.group({
        schoolName: ['', Validators.required],
        course: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        description: ['', Validators.required],
    });
  }
  addSchool() {
      this.schoolInfo.push(this.initSchool());
  }
  updateSchool(sch) {
    return this.formBuilder.group({
        schoolName: [sch.schoolName, Validators.required],
        course: [sch.major, Validators.required],
        startDate: [sch.year, Validators.required],
        endDate: [sch.endyear, Validators.required],
        description: [sch.description, Validators.required],
    });
  }
  removeSchool(i: number) {
      this.schoolInfo.removeAt(i);
  }
}

