import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, forkJoin } from 'rxjs'; 
import { catchError, map } from 'rxjs/operators';

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  isEditing?: boolean;
}

export interface Meeting {
  id: number;
  clientId: number;
  date: string;
  time: string;
  location: string;
  description: string;
  client_name: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClientMeetingService {
  private apiUrl = 'http://localhost:3000/api';
  private clientsUrl = `${this.apiUrl}/clients`;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.clientsUrl, client, this.httpOptions).pipe(
      catchError(this.handleError<Client>('addClient'))
    );
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.clientsUrl);
  }

  addMeeting(meeting: Meeting): Observable<Meeting> {
    return this.http.post<Meeting>(`${this.apiUrl}/meetings`, meeting, this.httpOptions);
  }

  getMeetings(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.apiUrl}/meetings`).pipe(
      catchError(this.handleError<Meeting[]>('getMeetings'))
    );
  }
  
  deleteClient(clientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clients/${clientId}`);
  }

  deleteMeeting(meetingId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/meetings/${meetingId}`);
  }
  
  updateClient(updatedClient: Client): Observable<Client> {
	return this.http.put<Client>(`http://localhost:3000/api/clients/${updatedClient.id}`, updatedClient);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return throwError(error);
    };
  }
}
