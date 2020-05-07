import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private readonly notifier: NotifierService;
  notification: Subscription;

  constructor( private router: Router,
               private authService: AuthService,
               notifierService: NotifierService) { this.notifier = notifierService; }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })

    this.notification = this.authService.notificationListener()
    .subscribe((data) => {
        this.notifier.notify("success", data);
    })
  }

  onSingUp() {
    const username = this.form.value.username
    const email = this.form.value.email
    const password = this.form.value.password
    this.authService.createUser(username, email, password)
  }

  ngOnDestroy() {
    this.notification.unsubscribe();
  }
}
