import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { OauthProvider } from '../../../graphql/types/types';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { environment } from '@env/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '@app/shared/email-validator';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  providers: Observable<OauthProvider[]>;
  loading = false;
  returnUrl: string;
  showSpinner = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<LoginComponent>,
    ) {
    
  }

  ngOnInit() {
    this.form = this.fb.group({
      'mail': ['', [Validators.required, EmailValidator.validEmail]],
      'password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]]
    });

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
    if (!this.form.valid) {
      this.showSnackBar('Invalid data');
      return;
    }
    try {
      this.loading = true;
      await this.authenticationService.login(this.form.controls['mail'].value, this.form.controls['password'].value);
      this.router.navigate([this.returnUrl]);
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
