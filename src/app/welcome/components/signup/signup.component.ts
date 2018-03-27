import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef , MatSnackBar} from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { EmailValidator } from '@app/shared/email-validator';

@Component({
  selector: 'ksoc-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  title = 'Register';
  loginLink = '/login';

  submitted: boolean = false;
  errorDiagnostic: string;
  form: FormGroup;
  isregistered: boolean;
  displayEmailError:boolean;
  displayPwError:boolean;
  displayFnError:boolean;
  displayLnError:boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<SignupComponent>,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router) {
  }

  ngOnInit() {
    this.isregistered = false;
    this.form = this.formBuilder.group({
      'firstName': ['', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
      'lastName': ['', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
      'mail': ['', [Validators.required, EmailValidator.validEmail]],
      'password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]]
    });
  }

  onSubmit() {
    this.submitted = true;

    this.errorDiagnostic = null;
    if(!this.form.valid) {
      return;
    }

    /*
    this.apollo.mutate({
      mutation: createUserMutation,
      variables:{
        user: {
          username: this.form.controls['mail'].value,
          email: this.form.controls['mail'].value,
          password: this.form.controls['password'].value,
          profile: {
            name: this.form.controls['firstName'].value + ' ' + this.form.controls['lastName'].value ,
            firstName: this.form.controls['firstName'].value,
            lastName: this.form.controls['lastName'].value,
          }
        }
      }
    }).subscribe(data => {
        if (!!data.data.createUser) {
          this.isregistered = true;
          this.openSnackBar('Done! Please check your email to activate your account')
          this.dialogRef.close();
          this.router.navigate(["/"], { relativeTo: this.activatedRoute })
        } else {
          this.openSnackBar('Failed to register, please try again later');
          this.submitted = false;
        }
    }, (err) => {
        this.openSnackBar(err);
    }); 
    */
  }


  private openSnackBar(msg: string) {
    this.snackBar.open(msg,'Close',{
      duration:6000
    });
  }


}
