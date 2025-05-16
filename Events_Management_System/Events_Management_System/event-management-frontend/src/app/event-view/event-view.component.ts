import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService, Event } from '../services/event.service';

@Component({
  selector: 'app-event-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Events</h2>
      <div class="event" *ngFor="let event of events">
        <h3>{{event.title}}</h3>
        <p>{{event.description}}</p>
        <div class="datetime">{{event.eventDateTime | date:'medium'}}</div>
        <div class="location">{{event.location}}</div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 700px;
      margin: auto;
      padding: 1rem;
    }
    .event {
      border: 1px solid #ddd;
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 6px;
      background: #fff;
    }
    h3 {
      margin-top: 0;
    }
    .location, .datetime {
      font-style: italic;
      color: #555;
    }
  `]
})
export class EventViewComponent implements OnInit {

  events: Event[] = [];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(evts => this.events = evts.filter(e => e.active));
  }

}
