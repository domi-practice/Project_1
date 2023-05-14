import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { MeetingFormComponent } from './meeting-form/meeting-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'client-creation', component: ClientFormComponent },
  { path: 'meetings', component: MeetingsComponent },
  { path: 'client-meeting', component: MeetingFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
