import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private readonly notifier: NotifierService;
  notification: Subscription;

  constructor(private router: Router,
              private authService: AuthService,
              notifierService: NotifierService) { this.notifier = notifierService; }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })

    this.notification = this.authService.notificationListener()
    .subscribe((data) => {
      switch(data) {
        case 'Login Successfull' : this.notifier.notify("success", "Login Successfull"); break;
        case 'Wrong Password' : this.notifier.notify("error", "Wrong Password"); break;
        case "User Don't Exist" : this.notifier.notify("info", "User Don't Exist"); break;
      }
    })
  }

  onLogin() {
    this.authService.login(this.form.value.email, this.form.value.password)
  }

  ngOnDestroy() {
    this.notification.unsubscribe();
  }

}
