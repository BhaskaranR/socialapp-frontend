import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from '../../../core/services/authentication.service';
import {
  Country,
  UsernameValidator,
  PasswordValidator,
  ParentErrorStateMatcher,
  ZipcodeValidator
} from '@app/shared/validators';


@Component({
  selector: 'ksoc-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {

  userDetailsForm: FormGroup;
  accountDetailsForm: FormGroup;

  loading = false;
  matching_passwords_group: FormGroup;
  country_zipcode_group: FormGroup;

  parentErrorStateMatcher = new ParentErrorStateMatcher();

  genders = [
    "Male",
    "Female",
    "Other"
  ];

  countries = [
    new Country('US', 'United States'),
  ];


  validation_messages = {
    'fullname': [
      { type: 'required', message: 'Full name is required' }
    ],
    'bio': [
      { type: 'maxlength', message: 'Bio cannot be more than 256 characters long' },
    ],
    'gender': [
      { type: 'required', message: 'Please select your gender' },
    ],
    'birthday': [
      { type: 'required', message: 'Please insert your birthday' },
    ],
    'zipcode': [
      { type: 'required', message: 'Zipcode is required' },
      { type: 'validZipCode', message: 'Zipcode incorrect for the country selected' }
    ]
  };

  account_validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 5 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters' },
      { type: 'validUsername', message: 'Your username has already been taken' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'areEqual', message: 'Password mismatch' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 8 characters long' },
      // { type: 'pattern', message: 'Your password must be at least 8 characters, at least one letter, one number and one special character' }
    ],
    'terms': [
      { type: 'pattern', message: 'You must accept terms and conditions' }
    ]
  }

  constructor(private _formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForms();
  }



  createForms() {
    // matching passwords validation
    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
       // Validators.pattern('^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    // country & zipcode validation
    let country = new FormControl(this.countries[0], Validators.required);

    let zipcode = new FormControl('', {
      validators: Validators.compose([
        ZipcodeValidator.validZipCode,
        Validators.required
      ])
    });

    this.country_zipcode_group = new FormGroup({
      country: country,
      zipcode: zipcode
    });

    // user details form validations
    this.userDetailsForm = this._formBuilder.group({
      fullname: ['', Validators.required ],
      bio: ["", Validators.maxLength(256)],
      birthday: ['', Validators.required],
      gender: new FormControl(this.genders[0], Validators.required),
      country_zipcode: this.country_zipcode_group
    });


    // user links form validations
    this.accountDetailsForm = this._formBuilder.group({
      username: new FormControl('', Validators.compose([
       UsernameValidator.validUsername,
       Validators.maxLength(25),
       Validators.minLength(5),
       Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
       Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.matching_passwords_group,
      terms: new FormControl(false, Validators.pattern('true'))
    })

  }



  async onSubmitUserDetails(value){
    if (!this.accountDetailsForm.valid || !this.userDetailsForm.valid) {
      this.showSnackBar('Invalid data');
      return;
    }
    try {

      this.loading = true;
      await this.authenticationService.createUser(
        'password', {
          username: this.accountDetailsForm.controls['username'].value,
          email: this.accountDetailsForm.controls['email'].value,
          password: this.matching_passwords_group.controls['password'].value,
          profile: {
            name: this.userDetailsForm.controls['fullname'].value,
            zipcode: this.country_zipcode_group.controls['zipcode'].value,
            personalInfo: {
              gender: this.userDetailsForm.controls['gender'].value,
              birthday: this.userDetailsForm.controls['birthday'].value,
            },
            story: {
              tagline: this.userDetailsForm.controls['bio'].value
            }
        }})
       await this.authenticationService.requestVerificationEmail(this.accountDetailsForm.controls['email'].value);
      
    } catch (e) {
      console.error('Login failed', e);
      this.showSnackBar('Invalid username or password');
    } finally {
      this.loading = false;
    }
  }


  showSnackBar(msg: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 6000
    })
  }

}

