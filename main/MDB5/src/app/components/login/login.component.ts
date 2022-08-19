import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../auth/authentication.service";
import {Router} from "@angular/router";

import {HotToastService} from "@ngneat/hot-toast";
import * as firebase from 'firebase/compat';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
  }
  get email(): AbstractControl {
    return this.loginForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.loginForm.get('password')!;
  }
  submit(){
    if(!this.loginForm.valid){
      return;
    }
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).pipe(
      this.toast.observe({
        success: 'Logged in successfully',
        loading: ' Logging in....',
        error: 'There was an error'
      })
    ).subscribe(
      () => {
        this.router.navigate(['/home']);
      }
    )
}

  signInWithGoogle() {
    this.authService.googleSignIn().subscribe(
      () =>{
        this.router.navigate(['/home'])

      }
    )

  }




}

