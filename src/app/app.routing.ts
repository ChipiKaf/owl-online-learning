import { LoginGuard } from './services/guards/login.guard';
import { AuthGuard } from './services/guards/auth.guard';
import { SignupComponent } from './pages/signup/signup.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index',                component: WelcomeComponent },
    { path: 'login',       component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'signup',       component: SignupComponent, canActivate: [LoginGuard] },
    { path: 'profile',     component: ProfileComponent, canActivate: [AuthGuard]},
    { path: 'landing',     component: LandingComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
