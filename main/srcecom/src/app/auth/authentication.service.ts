import {Injectable} from '@angular/core';
import {from, Observable} from "rxjs";
import {Router} from "@angular/router";
import {
  Auth,
  authState,
   FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword, signInWithPopup, UserCredential
} from "@angular/fire/auth";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {HotToastService} from "@ngneat/hot-toast";


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  currentUser$ = authState(this.auth);
  constructor(public auth: Auth, public fireAuth: AngularFireAuth, private router: Router,private toast: HotToastService) {
  }
  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }
  //register

  // register(username: string, email: string, password: string) {
  //   return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
  //     switchMap(({user}) => updateProfile(user, {displayName: username})));
  // }
// @ts-ignore

  register(username: string, email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then( res => {
      this.toast.observe({
        success:'Sign Up success',
        loading:'Waiting for SignUp',
        error:'ERROR'
      })
        this.router.navigate(['/login']).then(() => this.auth.signOut());

      // this.sendEmailForVarification(res.user);
    }
    )
  }
  logout() {
    return from(this.auth.signOut());
  }

  //sign in with Google
  googleSignIn(): Observable<UserCredential> {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider()));
  }
  facebookSignIn(): Observable<UserCredential> {
    return from(signInWithPopup(this.auth, new FacebookAuthProvider()));
  }
  //forgot password

  // email varification



}


