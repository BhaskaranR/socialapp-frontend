import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { OauthProvider } from '../../../graphql/types/types';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { environment } from '@env/environment';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsernameValidator } from '@app/shared/validators';
// import { Accounts } from '@app/core/accounts/reducer';
// import * as selectors from '@app/core/accounts';
// import { setUser } from '../../../core/accounts/action';

@Component({
  selector: 'ksoc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  accountDetailsForm: FormGroup;


  providers: Observable<OauthProvider[]>;
  loading = false;
  returnUrl: string;
  showSpinner = false;

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
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 6 characters long' },
      // { type: 'pattern', message: 'Your password must be at least 8 characters, at least one letter, one number and one special character' }
    ]
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    public snackBar: MatSnackBar
  ) {


  }

  ngOnInit() {
    const userNameValidator = [
      UsernameValidator.validUsername,
      Validators.maxLength(25),
      Validators.minLength(5),
      Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
    ];
    this.accountDetailsForm = this.fb.group({
      // username: new FormControl('', Validators.compose([...[Validators.required], ...userNameValidator])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required,
        // Validators.pattern('/(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{6,}/')//todo come back to this later
      ]))
    })

    /* this.accountDetailsForm.get('username').valueChanges.subscribe((userName: string) => {
      this.accountDetailsForm.get('email').clearValidators();
      if (this.accountDetailsForm.get('username').value) {
        this.accountDetailsForm.get('email').setValidators([Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      } else {
        this.accountDetailsForm.get('email').setValidators([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])
      }
      this.accountDetailsForm.updateValueAndValidity()

    }); 

    this.accountDetailsForm.get('email').valueChanges.subscribe((email: string) => {
      this.accountDetailsForm.get('username').clearValidators();
      if (this.accountDetailsForm.get('email').valid) {
        this.accountDetailsForm.get('username').setValidators(userNameValidator);
      } else {
        this.accountDetailsForm.get('username').setValidators([...[Validators.required], ...userNameValidator]);
      }
      this.accountDetailsForm.updateValueAndValidity()


    });*/

    // available providers
    this.providers = this.authenticationService.availableProviders();
    // params
    const params = this.route.snapshot.queryParamMap;
    this.returnUrl = params.has('returnUrl') ? params.get('returnUrl') : '/';
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');
    const service = params.get('service');
    const error = params.get('error');

    if (accessToken && refreshToken && service) {
      this.showSpinner = true;
      this.handleAccessToken(service, accessToken, refreshToken);
    }

    if (error && service) {
      this.handleError(service, error);
    }
  }

  getServiceClass(service: string): string {
    return service + '-login';
  }

  getServiceUrl(service: string): string {
    return environment.apiBaseUrl + '/_oauth_apps/connect/' + service + '/pwa';
  }

  handleError(service: string, error: string): void {
    console.error(`Login with ${service} failed`, error);
    this.showSnackBar(`Failed to login with ${service}`);
  }

  async handleAccessToken(service, accessToken, refreshToken) {
    try {
      this.loading = true;
      const loggedIn = await this.authenticationService.refreshWithNewTokens(accessToken, refreshToken);

      if (loggedIn) {
        this.router.navigate([this.returnUrl]);
      } else {
        this.showSnackBar(`Failed to login with ${service}`);
      }
    } catch (e) {
      console.error(`Login with ${service} failed`, e);
    } finally {
      this.loading = false;
      this.showSpinner = false;
    }
  }

  async login() {
    if (!this.accountDetailsForm.valid) {
      this.showSnackBar('Invalid data');
      return;
    }
    try {
      this.loading = true;
      const response = await this.authenticationService.login(
        'password', {
          user: {
            // username: this.accountDetailsForm.controls['username'].value,
            email: this.accountDetailsForm.controls['email'].value
          },
          password: this.accountDetailsForm.controls['password'].value,
        });
       this.router.navigate([this.returnUrl], {
         relativeTo: this.activatedRoute
       });
       
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
