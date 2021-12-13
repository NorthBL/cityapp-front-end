import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginRequest } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginRequest = new LoginRequest();
  errorMsg: string;
  subscriotion: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  send(): void {
    this.loginRequest.email = this.loginForm.controls.email.value;
    this.loginRequest.password = this.loginForm.controls.password.value;
    if (this.loginRequest.email === '' || this.loginRequest.password === '') {
      this.errorMsg = 'All fields are requeired';
    } else {
      this.authService.userLogin(this.loginRequest).subscribe(data => {
        this.router.navigateByUrl('/home');
        },
        err => {
          this.errorMsg = err;
        });
    }
  }

}
