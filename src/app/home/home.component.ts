import { Component, OnInit } from '@angular/core';
import { ClientMeetingService, Client, Meeting } from '../client-meeting.service';
import { DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  clients: Client[] = [];
  meetings: Meeting[] = [];

  constructor(
    private clientMeetingService: ClientMeetingService,
    private datePipe: DatePipe 
  ) {}

  ngOnInit() {
    forkJoin({
      clients: this.clientMeetingService.getClients(),
      meetings: this.clientMeetingService.getMeetings(),
    }).subscribe(({ clients, meetings }) => {
      this.clients = clients;
      this.meetings = this.sortMeetingsByDate(meetings.map((meeting) => {
        const client = this.clients.find((c) => c.id === meeting.clientId);
        return {
          ...meeting,
          clientName: client ? client.name : 'Unknown',
        };
      }));
    });
  }
  
  removeClient(clientId: number): void {
    this.clientMeetingService.deleteClient(clientId).subscribe(() => {
      this.clients = this.clients.filter((client) => client.id !== clientId);
    });
  }
  
  removeMeeting(meetingId: number): void {
    this.clientMeetingService.deleteMeeting(meetingId).subscribe(() => {
      this.meetings = this.meetings.filter((meeting) => meeting.id !== meetingId);
    });
  }

  formatDate(date: string): string {
    const transformedDate = this.datePipe.transform(date, 'MM-dd-yyyy');
    return transformedDate ? transformedDate : '';
  }
  
  sortMeetingsByDate(meetings: Meeting[]): Meeting[] {
    return meetings.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
  
  editClient(clientId: number): void {
    const client = this.clients.find((c) => c.id === clientId);
    if (client) {
      client.isEditing = true;
    }
  }
  
  saveClient(clientId: number): void {
    const client = this.clients.find((c) => c.id === clientId);
    if (client) {
      this.clientMeetingService.updateClient(client).subscribe((updatedClient) => {
        const index = this.clients.findIndex((c) => c.id === clientId);
        this.clients[index] = {...updatedClient, isEditing: false}; 
      });
    }
  }
  
  
}
