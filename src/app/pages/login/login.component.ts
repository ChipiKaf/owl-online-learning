import { CrudService } from './../../services/crud.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DocumentChangeAction } from '@angular/fire/firestore/interfaces';
import { User } from 'app/models/user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    data: Date = new Date();
    focus;
    focus1;
    errorMessage = '';
    loading = false;
    constructor(private authService: AuthService,
        private crudService: CrudService,
         private router: Router) { }

    ngOnInit() {
        // this.authService.logout();
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');

        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
    }
    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');

        const navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
    }
    login (form: NgForm) {
        // console.log(form.value);
        this.loading = true;
        this.authService.login(form.value.email, form.value.password)
        .then((value) => {
            // console.log(value.user);
            // this.authService.setUser(value.user);
            // this.loading = false;
            this.authService.getFullUser('users', value.user.uid).pipe(
                map(actions => {
                  return actions.map((userData: DocumentChangeAction<User>) => {
                    const data = {
                      ...userData.payload.doc.data(),
                      id: userData.payload.doc.id
                    }
                    this.authService.setUser(data);
                    return data;
                  })
                })
              ).subscribe(items => {
                // console.log(items);
                this.router.navigateByUrl('/landing');
                //  this.authService.setUser(items)
              })
          
          })
        .catch(error => {
            this.loading = false;
            this.errorMessage = error.message;
            // console.log(error.message);
        });
    }
        googleLogin() {
            this.authService.googleLogin()
            .then(value => {
                this.loading = true;
                const data = {
                    displayName: value.user.displayName,
                    email: value.user.email,
                    followers: [],
                    following: [],
                    hasChannel: false,
                    isVerified: false,
                    content: [],
                    uid: value.user.uid,
                    photoURL: 'assets/img/default-avatar.png'
                  }
                  this.crudService.checkDocument('users', value.user.uid).snapshotChanges().subscribe((value2) => {
                   if (Array.isArray(value2) && value2.length !== 0) {

                       console.log("value2");
                    this.crudService.checkDocument('users', value.user.uid).snapshotChanges()
                    .pipe(
                        map(actions => {
                          return actions.map((Data: DocumentChangeAction<User>) => {
                           if (Data != null) {
                            const data2 = {
                                ...Data.payload.doc.data(),
                                id: Data.payload.doc.id
                              }
                              this.authService.setUser(data2);
                           }
                          })
                        })
                      ).subscribe((newData) => {
                          console.log(newData);
                          setTimeout(() => {
                            this.router.navigateByUrl('/landing');
                          }, 1000)
                          
                      })

                   } else {
                    this.authService.addToUser('users', data)
                    .then((value3) => {
                      console.log("Value 3");
                         console.log(value3);
                      this.authService.setUser(data);
                    //   console.log('Success', value)
                    //   this.router.navigateByUrl('/profile');
                    })
                    .catch((error) => {
                        this.loading = false;
                    })
                   }
                });
                  
              
              })
              .catch((error) => {
                  this.loading = false;
              })

                 }
}
