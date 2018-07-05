import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormArray, FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'dialog-result-example-dialog',
  templateUrl: './profile_place_info_popup.html',
  styleUrls: ['./profile_education_info_popup.css']
})

export class ProfilePlaceInfoPopup implements OnInit{
  public locationForm: FormGroup;
  current: string;
  get livedPlaces(): FormArray{
    return <FormArray>this.locationForm.get('livedPlaces');
  }
  get currentPlace(): FormArray{
    return <FormArray>this.locationForm.get('currentPlace');
  }
  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<ProfilePlaceInfoPopup>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
  }
   ngOnInit() {
     if(this.data){
         this.locationForm = this.fb.group({
             currentPlace: [this.data.currentPlace, [Validators.required]],
             livedPlaces: this.fb.array([])
          });
      this.data.livedPlaces.map(l => {
        this.livedPlaces.push(this.updateLivedplaces(l.livedLocationName));
      })
     }else{
            this.locationForm = this.fb.group({
             currentPlace: ['', [Validators.required]],
             livedPlaces: this.fb.array([this.initLivedPlaces()])
          });
     }

  }
  initLivedPlaces(){
     return this.fb.group({
        livedLocationName: ['', Validators.required],
    });
  }
  initCurrentPlace(){
     return this.fb.group({
        currentPlace: ['', Validators.required],
    });
  }
  addCurrentPlace(){
    this.livedPlaces.push(this.updateLivedplaces(this.locationForm.value.currentPlace));
    this.locationForm.patchValue({
      currentPlace: ''
    })
  }
  addLivedplaces() {
    this.livedPlaces.push(this.initLivedPlaces());
  }
  updateLivedplaces(p){
    return this.fb.group({
        livedLocationName: [p, Validators.required],
    });
  }
  removeLivedplaces(i: number) {
    this.livedPlaces.removeAt(i);
  }
}
