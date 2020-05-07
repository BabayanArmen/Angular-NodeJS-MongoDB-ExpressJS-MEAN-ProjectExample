import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>
             <notifier-container></notifier-container>`
})
export class AppComponent implements OnInit {
  title = 'MeanProject';

  constructor(private authService: AuthService,
              private router: Router
    ) {}

  ngOnInit(): void {
    // this part is for auto authenfication, when page reloads, calling
    // this.authService.autoAuthUser(), to check is user isAuth
    this.authService.autoAuthUser()
    if(this.authService.getIsAuth()){
      // we also have user staus in local storage, to check if this is user, and it's auth is true,
      // then redirect page to 'user', if admin. to 'admin'
      const status = localStorage.getItem('userStatus')

      if(status === 'user') {
        this.router.navigate(['/user'])
      }
      if(status === 'admin') {
        this.router.navigate(['/admin'])
      }

    }
  }

}
