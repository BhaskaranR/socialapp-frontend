import { FormArray, FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Component, Inject, Optional } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'profile-work-contact-info',
  templateUrl: './profile_work_contact_info_popup.html',
  styleUrls: ['./profile_work_contact_info_popup.css']
})

export class ProfileWorkContactInfoPopup {
  public contactForm: FormGroup;
  get emails(): FormArray{
    return <FormArray>this.contactForm.get('emails');
  }
  get addresses(): FormArray{
    return <FormArray>this.contactForm.get('addresses');
  }
  get phones(): FormArray{
    return <FormArray>this.contactForm.get('phones');
  }
  constructor(private formBuilder: FormBuilder,public dialogRef: MatDialogRef<ProfileWorkContactInfoPopup> ,@Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  ngOnInit() {
    if(this.data){
      this.contactForm = this.formBuilder.group({
            phones: this.formBuilder.array([]),
            emails: this.formBuilder.array([]),
            addresses: this.formBuilder.array([])
          });
      this.data.phonenumber.map(ph => {
        this.phones.push(this.updatePhone(ph));
      });
      this.data.website.map(w => {
        this.emails.push(this.updateEmail(w));
      });
      this.data.address.map(ph => {
        this.addresses.push(this.updateAddress(ph));
      });
    }else {
        this.contactForm = this.formBuilder.group({
              phones: this.formBuilder.array([this.initPhone()]),
              emails: this.formBuilder.array([this.initEmail()]),
              addresses: this.formBuilder.array([this.initAddress()])
            });
    }

  }
  initPhone() {
    return this.formBuilder.group({
        phoneNumber: ['', Validators.required],
        phoneType: ['', Validators.required]
    });
  }
  addPhone() {
      this.phones.push(this.initPhone());
  }
  updatePhone(phone) {
    return this.formBuilder.group({
        phoneNumber: [phone.phoneNumber, Validators.required],
        phoneType: [phone.phoneType, Validators.required]
    });
  }
  removePhone(i: number) {
      this.phones.removeAt(i);
  }
  initEmail() {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      emailType: ['', Validators.required]
    });
  }
  addEmail(): void {
    this.emails.push(this.initEmail());
  }
  updateEmail(mail) {
    return this.formBuilder.group({
        email: [mail.email, Validators.required],
        emailType: [mail.emailType, Validators.required]
    });
  }
  removeEmail(i: number) {
    this.emails.removeAt(i);
  }
  initAddress() {
    return this.formBuilder.group({
      address: ['', Validators.required]
    });
  }
  addAddress() {
    this.addresses.push(this.initAddress());
  }
  updateAddress(addr) {
    return this.formBuilder.group({
      address: [addr.address, Validators.required]
    });
  }
  removeAddress(i: number) {
    this.addresses.removeAt(i);
  }
}
