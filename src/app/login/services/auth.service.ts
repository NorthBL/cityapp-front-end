import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { LoginRequest, RegisterRequest, UserDto, LoginDto } from '../models/user';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
  };

  private loggedUserSubject = new BehaviorSubject<boolean>(false);
  public loggedUserAction$ = this.loggedUserSubject.asObservable();

  private loggedUserNameSubject = new BehaviorSubject<string>('');
  public userNameAction$ = this.loggedUserNameSubject.asObservable();

  public currentUser: UserDto;
  constructor(private httpClient: HttpClient, private cookies: CookieService, private router: Router) { }


  public userLogin(loginRequest: LoginRequest): Observable<UserDto> {
    return this.httpClient.post<LoginDto>('http://localhost:64537/api/login', {email: loginRequest.email, password: loginRequest.password},
    this.httpOptions
    )
    .pipe(
      switchMap(data => {
        return this.getUser();
      }),
      tap(user => {
        localStorage.setItem('user', user.email);
        this.currentUser = user;
        this.loggedUserSubject.next(true);
        this.loggedUserNameSubject.next(user.email);
      }),
      catchError(this.handleError)
    );
  }

  public createUser(registerRequest: RegisterRequest): Observable<UserDto> {
    return this.httpClient.post<UserDto>('http://localhost:64537/api/register',
    {
    firstName: registerRequest.FirstName,
    lastName: registerRequest.LastName,
    email: registerRequest.Email,
    password: registerRequest.password
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  public getUser(): Observable<UserDto> {
    return this.httpClient.get<UserDto>('http://localhost:64537/api/user', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
      })
    .pipe(
      catchError(this.handleError)
    );
  }

  public logoutUser(): Observable<any> {
    this.cookies.remove('jwt');
    localStorage.setItem('user', '');
    this.loggedUserSubject.next(false);
    this.currentUser = null;
    return this.httpClient.post<any>('http://localhost:64537/api/logout', { logout: 'yes' })
    .pipe(
      tap(data => this.router.navigate(['/account', 'login'])),
      catchError(this.handleError)
    );
  }

  private handleError(err: any): Observable<never> {
    console.error(err);
    return throwError(err.error.message);
  }
}

