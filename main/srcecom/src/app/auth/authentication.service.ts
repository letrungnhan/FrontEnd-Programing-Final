import {Injectable} from '@angular/core';
import {from, Observable} from "rxjs";
import {
  Auth,
  authState, createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword, signInWithPopup, updateProfile, UserCredential
} from "@angular/fire/auth";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {switchMap} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  currentUser$ = authState(this.auth);
  constructor(public auth: Auth, public fireAuth: AngularFireAuth) {
  }
  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }
  //register

  register(username: string, email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(({user}) => updateProfile(user, {displayName: username})));
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


