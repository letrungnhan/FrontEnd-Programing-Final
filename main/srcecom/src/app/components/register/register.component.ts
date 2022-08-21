import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthenticationService} from "../../auth/authentication.service";
import {HotToastService} from "@ngneat/hot-toast";
import {Router} from "@angular/router";
import {style} from "@angular/animations";

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const repeat = control.get('repeat')?.value;

    if (password && repeat && password !== repeat) {
      return {
        passwordsDontMatch: true
      }
    }
    return null;

  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private authService: AuthenticationService, private toast: HotToastService, private router: Router) {
    this.registerForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.email),
      password: new FormControl(null, Validators.required),
      repeat: new FormControl(null, Validators.required),
    }, {validators: passwordsMatchValidator()})
  }

  ngOnInit(): void {
  }

  get username(): AbstractControl {
    return this.registerForm.get('username')!;
  }

  get email(): AbstractControl {
    return this.registerForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.registerForm.get('password')!;
  }

  get repeat(): AbstractControl {
    return this.registerForm.get('repeat')!;
  }

  // submit() {
  //   if (!this.registerForm.valid) return;
  //   const {username, email, password} = this.registerForm.value;
  //   this.authService.register(username, email, password);.pipe(
  //     this.toast.observe({
  //       success: 'Congrats! You are all signed up',
  //       loading: 'Wating for sign up',
  //       error: ({message}) => `$(at least 6 characters)`
  //     })
  //   ).subscribe(
  //     () => {
  //       this.router.navigate(['/login']).then(r => this.authService.logout());
  //     }
  //   )
  //
  // }

  submit() {
    if (!this.registerForm.valid) return;
    const {username, email, password} = this.registerForm.value;
    this.authService.register(username, email, password);
    this.toast.observe({
      success:'Sign Up success',
      loading:'Waiting for SignUp',
      error:'ERROR'
    });
  }

}
