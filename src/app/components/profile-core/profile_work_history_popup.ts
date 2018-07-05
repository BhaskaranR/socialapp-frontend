import { Component, Optional, Inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormArray, FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'dialog-result-example-dialog',
  templateUrl: './profile_work_history_popup.html',
  styleUrls: ['./profile_work_history_popup.css']
})

export class ProfileWorkHistoryPopup {
  public workForm: FormGroup;
  get workedCompanies(): FormArray {
    return <FormArray>this.workForm.get('workedCompanies');
  }
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ProfileWorkHistoryPopup>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
    if (this.data && this.data.workHistory) {
      this.workForm = this.fb.group({
        workedCompanies: this.fb.array([])
      });
        this.data.workHistory.map(w => {
          this.workedCompanies.push(this.updateWork(w));
        });
    } else {
      this.workForm = this.fb.group({
        workedCompanies: this.fb.array([this.initworkedCompanies()])
      });
    }
  }
  initworkedCompanies() {
    return this.fb.group({
      companyName: ['', Validators.required],
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  addCompany(): void {
    this.workedCompanies.push(this.initworkedCompanies());
  }
  updateWork(w) {
    return this.fb.group({
      companyName: [w.companyName, Validators.required],
      title: [w.title, Validators.required],
      startDate: [w.startDate, Validators.required],
      endDate: [w.endDate, Validators.required],
      description: [w.description, Validators.required]
    });
  }
  removeCompany(i: number) {
    this.workedCompanies.removeAt(i);
  }
}
