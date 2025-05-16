import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { EventViewComponent } from './event-view/event-view.component';
import { EventsComponent } from './events/events.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'admin/events', 
    component: AdminEventsComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'events/:id', 
    component: EventViewComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'events', 
    component: EventsComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' }
];
