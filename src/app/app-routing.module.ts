import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { AccessComponent } from './access/access.component';
import { ProtectoraProfileComponent } from './protectora/protectora-profile/protectora-profile.component';
import { ProtectoraCreatePublicationComponent } from './protectora/protectora-create-publication/protectora-create-publication.component';
import { ProtectoraPublicProfileComponent } from './protectora/protectora-public-profile/protectora-public-profile.component';
import { ProtectoraSidenavComponent } from './protectora/protectora-sidenav/protectora-sidenav.component';

const routes: Routes = [
  { path: '', redirectTo: 'access', pathMatch: 'full' },
  { path: 'access', component: AccessComponent, canActivate: [AuthGuard] },
  // { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  // { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'protectora', component: ProtectoraSidenavComponent, resolve: { data: UserResolver}, children: [
    //{ path: 'user', component: UserComponent, resolve: { data: UserResolver}},
    { path: 'perfil-protectora', component: ProtectoraProfileComponent, resolve: { data: UserResolver}},
    { path: 'nueva-publicacion', component: ProtectoraCreatePublicationComponent, resolve: { data: UserResolver}},
    { path: `perfil/:id`, component: ProtectoraPublicProfileComponent, resolve: { data: UserResolver}},
  ]}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
