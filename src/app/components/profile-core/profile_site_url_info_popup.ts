import { Component, OnInit, Optional, Inject } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormArray, FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'dialog-result-example-dialog',
  templateUrl: './profile_site_url_info_popup.html',
  styleUrls: ['./profile_education_info_popup.css']
})

export class ProfileSiteUrlPopup implements OnInit{
  public siteUrlForm: FormGroup;
  get siteUrls(): FormArray{
    return <FormArray>this.siteUrlForm.get('siteUrls');
  }
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ProfileSiteUrlPopup>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {}
   ngOnInit() {
     if(this.data) {
      this.siteUrlForm = this.fb.group({
             siteUrls: this.fb.array([])
          });
      this.data.map(s => {
        this.siteUrls.push(this.updateSiteUrls(s));
      });
     } else{
       this.siteUrlForm = this.fb.group({
             siteUrls: this.fb.array([this.initSiteUrls()])
          });
     }
  }
  initSiteUrls(){
     return this.fb.group({
        title: ['', Validators.required],
        url: ['', Validators.required]

    });
  }
  addSiteUrls(): void {
    this.siteUrls.push(this.initSiteUrls());
  }
  updateSiteUrls(site) {
     return this.fb.group({
        title: [site.title, Validators.required],
        url: [site.url, Validators.required]
    });
  }
  removeSiteUrls(i: number) {
    this.siteUrls.removeAt(i);
  }
}
