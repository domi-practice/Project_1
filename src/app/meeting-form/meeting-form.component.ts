import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientMeetingService, Meeting, Client } from '../client-meeting.service';

@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.scss'],
})
export class MeetingFormComponent implements OnInit {
  clients: Client[] = [];

  clientId?: number;
  date?: string;
  time?: string;
  location?: string;
  description?: string;

  constructor(private clientMeetingService: ClientMeetingService) {}

  ngOnInit(): void {
    this.clientMeetingService.getClients().subscribe((clients) => {
      this.clients = clients;
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const meeting: Meeting = {
        id: 0, // This value will be ignored by the server as it auto-increments the ID
        clientId: form.value.clientId,
        date: form.value.date,
        time: form.value.time,
        location: form.value.location,
        description: form.value.description,
        client_name: '', 
      };

      this.clientMeetingService.addMeeting(meeting).subscribe(
        (newMeeting) => {
          console.log('Meeting scheduled:', newMeeting);
          form.reset();
        },
        (error) => {
          console.error('Error scheduling meeting:', error);
        }
      );
    }
  }
}
