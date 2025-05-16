import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService, Event } from '../services/event.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-events',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit {
  events: Event[] = [];
  editingEvent: Event | null = null;
  isNew = false;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });
  }

  startCreate() {
    this.editingEvent = {
      title: '',
      description: '',
      location: '',
      eventDateTime: '',
      active: true
    };
    this.isNew = true;
  }

  startEdit(event: Event) {
    this.editingEvent = {...event};
    this.isNew = false;
  }

  cancel() {
    this.editingEvent = null;
  }

  save(form: NgForm) {
    if (!this.editingEvent) return;
    if (this.isNew) {
      this.eventService.createEvent(this.editingEvent).subscribe(() => {
        this.loadEvents();
        this.editingEvent = null;
      });
    } else {
      this.eventService.updateEvent(this.editingEvent.id!, this.editingEvent).subscribe(() => {
        this.loadEvents();
        this.editingEvent = null;
      });
    }
  }

  deleteEvent(id?: number) {
    if (!id) return;
    if (confirm("Are you sure to delete this event?")) {
      this.eventService.deleteEvent(id).subscribe(() => this.loadEvents());
    }
  }
}
