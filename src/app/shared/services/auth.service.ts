import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private notifier = new Subject<string>()
  private token: string;
  private isAuthenticated = false;
  private currentUserName: string
  //we don't need this yet
  // private authStatusListener = new Subject<boolean>()
  ////////////////////////

  constructor(private http: HttpClient,
              private router: Router) { }

  createUser(username: string, email: string, password: string) {
    const user:User = {_id: null, status: null, username, email, password }
    this.http.post<{message: string, status: boolean}>('http://localhost:3000/api/user/signup', user)
    .subscribe( (data) => {
      console.log(data.message);
      this.notifier.next(data.message);
      data.status ? this.router.navigate(['/login']) : '';
    })
  }

  login(email: string, password: string) {
    const user: User = {_id:null, status:null, username:null, email, password};
    this.http.post<{token: string, message: string, status: string, expiresIn: number, userID: string, userName: string}>('http://localhost:3000/api/user/login', user)
    .subscribe((data) => {
      this.token = data.token;
      this.currentUserName = data.userName;
      this.notifier.next(data.message);
      if(data.token){
        this.isAuthenticated =  true;

        ////////////// local storage ///////////
        localStorage.setItem('token', data.token);
        localStorage.setItem('userStatus', data.status);  // this is for redirect to user or admin page,  when automatic auth
        localStorage.setItem('currentUserID', data.userID);
        ////////////////////////////////////////

        if(data.status === 'user') {
          this.router.navigate(['/user'])
        }
        if(data.status === 'admin') {
          this.router.navigate(['/admin'])
        }

      }
      // we don't use it yet
      // this.authStatusListener.next(true);
      //////////////////////
    })
  }

  logout() {
    /////// local storage //////////
    localStorage.removeItem('token');
    localStorage.removeItem('userStatus');  // this is for redirect to user or admin page, when automatic auth
    localStorage.removeItem('currentUserID');
    ////////////////////////////////
    this.token = null;
    this.isAuthenticated = false;
    this.router.navigate(['/'])
  }

  notificationListener() {
    return this.notifier.asObservable();
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getCurrentUserName() {
    return this.currentUserName;
  }

//////////// auto auth from local storage ////////////
///// call this method from app.component.ts/////
  autoAuthUser() {
    const tokenLocalStorage = localStorage.getItem('token');
    this.token = tokenLocalStorage;  // because when we reload page, we don't have token in authService anymore, so we take it from local storage
    if(tokenLocalStorage) {
      this.isAuthenticated = true;
    } else this.isAuthenticated = false;
  }
//////////////////////////////////////////////////



//we don't need this yet
// getAusthStatusListener() {
//   return this.authStatusListener.asObservable();
// }
////////////////////////

}
