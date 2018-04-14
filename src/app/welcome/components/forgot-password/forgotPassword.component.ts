
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Apollo } from 'apollo-angular';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'ks-forgot',
  templateUrl: './forgotPassword.component.html',
  styleUrls: ["./forgotPassword.component.scss"]
})
export class ForgotPasswordComponent implements OnInit {

  public form: FormGroup;
  displayEmailError:boolean;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    public apollo: Apollo,
    public snakcBar: MatSnackBar) {}

  ngOnInit() {
    this.form = this.fb.group ( {
      mail: [ null, Validators.compose( [ Validators.required, CustomValidators.email ] ) ]
    } );
  }

  onSubmit(event: any) {
    if (!this.form.valid){
      alert("form is invalid");
      return;
    }

    
    event.preventDefault();
  }


  private opneSnackBar(msg: string) {
    this.snakcBar.open(msg,'Close',{
      duration:6000
    })
  }
}

