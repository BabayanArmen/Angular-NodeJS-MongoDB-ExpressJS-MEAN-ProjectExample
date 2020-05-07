import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { OverviewPageComponent } from './pages/overview-page/overview-page.component';
import { PostsPageComponent } from './pages/posts-page/posts-page.component';
import { UpdatePostComponent } from './pages/posts-page/update-post/update-post.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AuthGuard } from './shared/classes/auth.guard';


const routes: Routes = [

  {path: '', component: AuthLayoutComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},

  {path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [

    // user page routing
    {path: 'user', component: UserPageComponent },
    {path: 'overview', component: OverviewPageComponent},
    {path: 'posts', component: PostsPageComponent, children: [
      {path:':id', component: UpdatePostComponent}
    ]},

  ]},

      // admin page routing
  {path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard]},

  {path: '**', redirectTo: '', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
