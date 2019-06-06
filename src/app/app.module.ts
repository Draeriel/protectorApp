import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatCheckboxModule, MatSidenavModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { UserResolver } from './user/user.resolver';
import { AuthGuard } from './core/auth.guard';
import { AccessComponent } from './access/access.component';
import { ProtectoraComponent } from './protectora/protectora.component';
import { ProtectoraProfileComponent } from './protectora/protectora-profile/protectora-profile.component';
import { FirebaseService } from './services/firebase.service';
import { AvailableScheduleComponent } from './shared/available-schedule/available-schedule.component';
import { ProtectoraPublicProfileComponent } from './protectora/protectora-public-profile/protectora-public-profile.component';
import { ProtectoraCreatePublicationComponent } from './protectora/protectora-create-publication/protectora-create-publication.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ProtectoraSidenavComponent } from './protectora/protectora-sidenav/protectora-sidenav.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import {MatRadioModule} from '@angular/material/radio';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { VolunteerProfileComponent } from './volunteer/volunteer-profile/volunteer-profile.component';
import { VolunteerResolver } from './user/volunteer.resolver';
import { HomeComponent } from './shared/home/home.component';
import { ProtectoraContactDataComponent } from './protectora/protectora-contact-data/protectora-contact-data.component';
import { ProtectoraVolunteersComponent } from './protectora/protectora-volunteers/protectora-volunteers.component';
import { CommentsComponent } from './comments/comments.component';





@NgModule({
  declarations: [AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    AccessComponent,
    ProtectoraComponent,
    ProtectoraProfileComponent,
    AvailableScheduleComponent,
    ProtectoraPublicProfileComponent,
    ProtectoraCreatePublicationComponent,
    ProtectoraSidenavComponent,
    HeaderComponent,
    FooterComponent,
    VolunteerComponent,
    VolunteerProfileComponent,
    HomeComponent,
    ProtectoraContactDataComponent,
    ProtectoraVolunteersComponent,
    CommentsComponent],
  imports: [
    NgbModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSidenavModule,
    NoopAnimationsModule,
    AngularFontAwesomeModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [AuthService, UserService, UserResolver, VolunteerResolver, AuthGuard, FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
