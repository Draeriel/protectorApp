import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { UserResolver } from './user/user.resolver';
import { VolunteerResolver } from './user/volunteer.resolver';
import { AuthGuard } from './core/auth.guard';
import { AccessComponent } from './access/access.component';
import { ProtectoraProfileComponent } from './protectora/protectora-profile/protectora-profile.component';
import { ProtectoraCreatePublicationComponent } from './protectora/protectora-create-publication/protectora-create-publication.component';
import { ProtectoraPublicProfileComponent } from './protectora/protectora-public-profile/protectora-public-profile.component';
import { ProtectoraSidenavComponent } from './protectora/protectora-sidenav/protectora-sidenav.component';
import { VolunteerProfileComponent } from './volunteer/volunteer-profile/volunteer-profile.component';
import { HomeComponent } from './shared/home/home.component';
import { ProtectoraVolunteersComponent } from './protectora/protectora-volunteers/protectora-volunteers.component';
import { VolunteerSidenavComponent } from './volunteer/volunteer-sidenav/volunteer-sidenav.component';
import { VolunteerProtectorasComponent } from './volunteer/volunteer-protectoras/volunteer-protectoras.component';
import { MessagesComponent } from './messages/messages.component';
import { MessagesListComponent } from './messages/messages-list/messages-list.component';
import { AdoptionFormComponent } from './adoption-form/adoption-form.component';


const routes: Routes = [
  { path: '', redirectTo: 'access', pathMatch: 'full' },
  { path: 'access', component: AccessComponent, canActivate: [AuthGuard] },
  //{ path: 'inicio', component: HomeComponent},
  { path: `perfil/:id`, component: ProtectoraPublicProfileComponent},
  // { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  // { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'protectora', component: ProtectoraSidenavComponent, resolve: { data: UserResolver}, children: [
    //{ path: 'user', component: UserComponent, resolve: { data: UserResolver}},
    { path: 'inicio', component: HomeComponent, resolve: { data: UserResolver}},
    { path: 'perfil-protectora', component: ProtectoraProfileComponent, resolve: { data: UserResolver}},
    { path: 'nueva-publicacion', component: ProtectoraCreatePublicationComponent, resolve: { data: UserResolver}},
    { path: `perfil/:id`, component: ProtectoraPublicProfileComponent, resolve: { data: UserResolver}},
    { path: `voluntarios`, component: ProtectoraVolunteersComponent, resolve: { data: UserResolver}},
    { path: 'protectoras', component: VolunteerProtectorasComponent, resolve: { data: UserResolver}},
    { path: 'listado-mensajes', component: MessagesListComponent, resolve: { data: UserResolver}},
    { path: `mensajes/:id`, component: MessagesComponent, resolve: { data: UserResolver}},
    { path: 'inicio', component: HomeComponent, resolve: { data: UserResolver}},
    { path: 'cuestionario-adopcion/:id', component: AdoptionFormComponent, resolve: { data: UserResolver}}
  ]},
  { path: 'voluntario', component: VolunteerSidenavComponent, resolve: { data: VolunteerResolver}, children: [
    { path: 'perfil-voluntario', component: VolunteerProfileComponent, resolve: { data: VolunteerResolver}},
    { path: 'protectoras', component: VolunteerProtectorasComponent, resolve: { data: VolunteerResolver}},
    { path: `perfil/:id`, component: ProtectoraPublicProfileComponent, resolve: { data: VolunteerResolver}},
    { path: 'listado-mensajes', component: MessagesListComponent, resolve: { data: VolunteerResolver}},
    { path: `mensajes/:id`, component: MessagesComponent, resolve: { data: VolunteerResolver}},
    { path: 'inicio', component: HomeComponent, resolve: { data: VolunteerResolver}},
    { path: 'cuestionario-adopcion', component: AdoptionFormComponent, resolve: { data: VolunteerResolver}}
  ]}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
