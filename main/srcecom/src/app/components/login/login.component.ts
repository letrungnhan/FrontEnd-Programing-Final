import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../auth/authentication.service";
import {Router} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";
import {FacebookAuthProvider, getAuth, signInWithPopup, signInWithRedirect} from "@angular/fire/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  provider = new FacebookAuthProvider();
  captcha: string;
  eamil: string;


  constructor(

    private authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService
  ) {

    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });

    this.captcha = '';
    this.eamil = 'hxthinh2001@gmail.com';
  }

  ngOnInit(): void {
  }

  get email(): AbstractControl {
    return this.loginForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.loginForm.get('password')!;
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    const {email, password} = this.loginForm.value;
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
    this.authService.googleSignIn().pipe(
      this.toast.observe({
        success: 'Login success',
        loading: 'Waiting for Login.....',
        error: 'ERROR'
      })
    ).subscribe(
      () => {
        this.router.navigate(['/home'])

      }
    )

  }
  signInWithFacebook() {
    this.authService.facebookSignIn().pipe(
      this.toast.observe({
        success: 'Login success',
        loading: 'Waiting....',
        error: 'ERROR'
      })
    ).subscribe(
      () => {
        this.router.navigate(['/home'])

      }
    )

  }
}

