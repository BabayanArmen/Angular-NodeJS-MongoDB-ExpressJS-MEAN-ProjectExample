import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { NgxLoadingModule } from 'ngx-loading';
import { NotifierModule, NotifierOptions } from "angular-notifier";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { OverviewPageComponent } from './pages/overview-page/overview-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { PostsPageComponent } from './pages/posts-page/posts-page.component';
import { UpdatePostComponent } from './pages/posts-page/update-post/update-post.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/services/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    LoginPageComponent,
    RegisterPageComponent,
    OverviewPageComponent,
    AdminPageComponent,
    PostsPageComponent,
    UpdatePostComponent,
    UserPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSmartModalModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    NotifierModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
