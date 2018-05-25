import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from '@app/settings';
import { WelcomeComponent } from '@app/welcome/welcome.component';
import { AboutComponent } from '@app/static';
import { NotFoundComponent } from '../not-found/not-found.component';
import { LoginComponent } from '@app/welcome/components/login/login.component';
import { SignupComponent } from '@app/welcome/components/signup/signup.component';
import { ForgotPasswordComponent } from '@app/welcome/components/forgot-password/forgotPassword.component';
import { VerifyEmailComponent } from './components/verify-email/verifyemail.component';

const routes: Routes = [
    {
        path: 'ks',
        component: WelcomeComponent,
        children: [
            {
                path: 'forgotpassword',
                component: ForgotPasswordComponent
            },
            {
                path: '',
                component: AboutComponent
            },
            {
                path: 'settings',
                component: SettingsComponent,
                data: {
                    title: 'Settings'
                }
            },
            {
                path: 'trending',
                loadChildren: 'app/trending/trending.module#TrendingModule'
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'signup',
                component: SignupComponent
            },
            {
                path: 'verify-email/:id',
                component: VerifyEmailComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoutingModule { }
