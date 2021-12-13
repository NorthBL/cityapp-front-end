import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/login/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  loggedUser: boolean;
  userName: string;
  loggedUser$ = this.authService.loggedUserAction$.subscribe(data => this.loggedUser = data);
  loggedUserName$ = this.authService.userNameAction$.subscribe(data => this.userName = data);
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') !== '' && localStorage.getItem('user') !== null) {
      this.loggedUser = true;
      this.userName = localStorage.getItem('user');
    }
  }

  logoutUser(): void {
    this.authService.logoutUser().subscribe();
  }

}
