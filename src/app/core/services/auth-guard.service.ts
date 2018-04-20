import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { getMe } from '../../graphql/queries/users/me.query';
import { AccountsClient } from '@app/core/services/account.service';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(private router: Router,
    private accountService: AccountsClient,
    private apollo: Apollo) { }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
     if (this.accountService.user == null || this.accountService.user == undefined) {
       this.router.navigate(['/ks'], { queryParams: { returnUrl: state.url } });	
       return of(false);
     }
     return of(true);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(childRoute, state);
  }
}
