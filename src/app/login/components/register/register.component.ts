import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisterRequest } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;
  registerRequest = new RegisterRequest();
  errorMsg: string;
  subscriotion: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  send(): void {
    this.registerRequest.FirstName = this.loginForm.controls.firstName.value;
    this.registerRequest.LastName = this.loginForm.controls.lastName.value;
    this.registerRequest.Email = this.loginForm.controls.email.value;
    this.registerRequest.password = this.loginForm.controls.password.value;
    if (this.registerRequest.Email === '' || this.registerRequest.password === ''
    || this.registerRequest.FirstName === '' || this.registerRequest.LastName === '') {
      this.errorMsg = 'All fields are requeired';
    } else {
      this.authService.createUser(this.registerRequest).subscribe(
        data => {
        this.router.navigate(['/account', 'login']);
        },
        err => {
          this.errorMsg = err;
        });
    }
  }
}
