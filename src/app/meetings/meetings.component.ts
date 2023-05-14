import { Component, OnInit } from '@angular/core';
import { ClientMeetingService } from '../client-meeting.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnInit {
  meetings: any[] = [];

  constructor(private clientMeetingService: ClientMeetingService) { }

  ngOnInit(): void {
    this.getMeetings();
  }

  getMeetings(): void {
    this.clientMeetingService.getMeetings().subscribe((meetings) => {
      this.meetings = meetings;
    });
  }
}
