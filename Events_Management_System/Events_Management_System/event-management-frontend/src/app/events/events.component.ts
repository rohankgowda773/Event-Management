import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService, Event } from '../services/event.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: Event[] = [];
  showCreateModal = false;
  newEvent: Event = {
    title: '',
    eventDateTime: new Date().toISOString(),
    location: '',
    description: '',
    active: true
  };

  constructor(
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (events) => {
        this.events = events;
      },
      error: (error) => {
        console.error('Error loading events:', error);
      }
    });
  }

  openCreateEventModal(): void {
    this.showCreateModal = true;
  }

  closeCreateEventModal(): void {
    this.showCreateModal = false;
    this.resetNewEvent();
  }

  createEvent(): void {
    this.eventService.createEvent(this.newEvent).subscribe({
      next: () => {
        this.loadEvents();
        this.closeCreateEventModal();
      },
      error: (error) => {
        console.error('Error creating event:', error);
      }
    });
  }

  editEvent(id: number): void {
    this.router.navigate(['/events', id, 'edit']);
  }

  deleteEvent(id: number): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(id).subscribe({
        next: () => {
          this.loadEvents();
        },
        error: (error) => {
          console.error('Error deleting event:', error);
        }
      });
    }
  }

  viewEvent(id: number): void {
    this.router.navigate(['/events', id]);
  }

  private resetNewEvent(): void {
    this.newEvent = {
      title: '',
      eventDateTime: new Date().toISOString(),
      location: '',
      description: '',
      active: true
    };
  }
} 