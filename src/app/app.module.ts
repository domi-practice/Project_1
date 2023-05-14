import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { MeetingFormComponent } from './meeting-form/meeting-form.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ClientMeetingService } from './client-meeting.service';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientsComponent,
    ClientFormComponent,
    MeetingsComponent,
    MeetingFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
	FormsModule,
    AppRoutingModule
  ],
  providers: [ClientMeetingService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
