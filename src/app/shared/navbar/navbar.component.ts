import { StateManagerService } from './../../services/state-manager.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {
    @ViewChild('navbar') navbar: ElementRef;
    private toggleButton: any;
    private sidebarVisible: boolean;
    navbarState: boolean;
    constructor(public location: Location,
        private element: ElementRef,
        private authService: AuthService,
        private stateManagerService: StateManagerService) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.navbarState = this.authService.getState();
    }
    ngAfterViewInit() {
        console.log(this.navbar.nativeElement.clientHeight);
        const navbar: HTMLElement = this.navbar.nativeElement;
        navbar.classList.remove('navbar-transparent');
        this.navbar.nativeElement.classList.remove('navbar-transparent');
        this.stateManagerService.navbarHeight = this.navbar.nativeElement.clientHeight;
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        setTimeout(function() {
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    isDocumentation() {
        const titlee = this.location.prepareExternalUrl(this.location.path());
        if ( titlee === '/documentation' ) {
            return true;
        } else {
            return false;
        }
    }
    logout() {
        this.authService.logout();
    }
}
