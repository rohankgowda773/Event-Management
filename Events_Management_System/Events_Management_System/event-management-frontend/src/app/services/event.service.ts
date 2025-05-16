import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Event {
  id?: number;
  title: string;
  description: string;
  location: string;
  eventDateTime: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/events`, { headers: this.getHeaders() });
  }

  getAdminEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/admin/events`, { headers: this.getHeaders() });
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/admin/events`, event, { headers: this.getHeaders() });
  }

  updateEvent(id: number, event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/admin/events/${id}`, event, { headers: this.getHeaders() });
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/events/${id}`, { headers: this.getHeaders() });
  }
}
