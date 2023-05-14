import { TestBed } from '@angular/core/testing';

import { ClientMeetingService } from './client-meeting.service';

describe('ClientMeetingService', () => {
  let service: ClientMeetingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientMeetingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
