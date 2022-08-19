import {Injectable} from '@angular/core';
import {from, Observable} from "rxjs";
import {switchMap} from "rxjs/operators";
import {Router} from "@angular/router";
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword, signInWithPopup, updateProfile, UserCredential
} from "@angular/fire/auth";


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  currentUser$ = authState(this.auth);


  constructor(private auth: Auth, private router: Router) {
  }

  login(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  register(name: string, email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(({user}) => updateProfile(user, {displayName: name})));


  }

  logout() {
    return from(this.auth.signOut());
  }

  //sign in with Google
  googleSignIn(): Observable<UserCredential> {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider()));


  }

}
