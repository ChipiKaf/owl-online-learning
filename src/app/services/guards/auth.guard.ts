import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import {
  CanActivate,
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'
import { from } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return from(this.afAuth.authState).pipe(
      map(authState => {
        console.log(authState);
        if (authState !== null) {
          console.log(state);
          return true } else {
          console.log(state)
          this.router.navigate(['/login'], {
            queryParams: { ref: state.url }
          })
        }
      })
    )
  }
}
