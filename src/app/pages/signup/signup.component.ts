import { DocumentChangeAction } from '@angular/fire/firestore/interfaces';
import { CrudService } from './../../services/crud.service';
import { User } from './../../models/user.model';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {


  data: Date = new Date();
  focus;
  focus1;
  errorMessage = '';
  loading = false;
  constructor(private authService: AuthService,
              private router: Router,
              private crudService: CrudService) { }

  ngOnInit() {
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

  SubmitForm(form: NgForm) {
    this.loading = true;
    console.log(form);
    this.authService.emailSignup(form.value.email, form.value.password, form.value.name)
    .then(value => {
      console.log(form.value.name);
      value.user.updateProfile({
        displayName: form.value.name,
        photoURL: ''
      });
      let user: User;
      user = {
        displayName: form.value.name,
        email: value.user.email,
        followers: [],
        following: [],
        hasChannel: false,
        isVerified: false,
        content: [],
        uid: value.user.uid,
        photoURL: 'assets/img/default-avatar'
      }
      this.authService.addToUser('users', user)
      .then((value2) => {
        console.log(value2);
        this.authService.setUser(user);
        this.router.navigateByUrl('/landing');
      })

    })
    .catch(error => {
      this.loading = false;
      this.errorMessage = error.message;
    });
  }
  passwordChanged(real: string, confirm: string) {
    if (real !== confirm) {
      this.errorMessage = 'Passwords do not match'
    } else {
      this.errorMessage = '';
    }
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
            photoURL: '../../../assets/img/default-avatar.png'
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
