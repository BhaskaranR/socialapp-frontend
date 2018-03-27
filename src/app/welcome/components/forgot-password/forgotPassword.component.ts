
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Apollo } from 'apollo-angular';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'ks-forgot',
  templateUrl: './forgotPassword.component.html',
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

    /*
    this.apollo.mutate({
      mutation: forgetPasswordMutation,
      variables:{
          user: this.form.controls['mail'].value,
      }
    }).subscribe(data => {
        this.opneSnackBar("An email is sent to you, check it out");
    }, (err) => {
      this.opneSnackBar(err);
    });
    */
    event.preventDefault();
  }


  private opneSnackBar(msg: string) {
    this.snakcBar.open(msg,'Close',{
      duration:6000
    })
  }
}

