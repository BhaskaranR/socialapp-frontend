import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-verify-email',
  template: ``
})
export class VerifyEmailComponent implements OnInit {


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    public snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async params =>  {  
        if(!params['id']) {
            this.showSnackBar('invalid token');
        } else {
            await this.authenticationService.verifyEmail(params['id']);
            //todo send welcome email & thanks for verification
            this.router.navigate(['/ks/login']);
        }
    });
  }

  showSnackBar(msg: string) {
    this.snackBar.open(msg, 'Close', {
      duration: 6000
    }).afterDismissed().subscribe(() => {
        this.router.navigate(['/ks/login']);
    })
  }

}
