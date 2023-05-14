import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientMeetingService, Client } from '../client-meeting.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent {
  clientName?: string;
  clientPhone?: string;
  clientEmail?: string;

  constructor(private clientMeetingService: ClientMeetingService) {}

  onAddClient(form: NgForm) {
    if (form.valid) {
      console.log('Form values:', form.value);
      const newClient: Client = {
        id: 0,
        name: form.value.name,
        phone: form.value.phone,
        email: form.value.email,
      };

      console.log('New client object:', newClient);

      this.clientMeetingService.addClient(newClient).subscribe(
        (client) => {
          console.log('Client added:', client);
          form.reset();
        },
        (error) => {
          console.error('Error adding client:', error);
        }
      );
    }
  }
}
