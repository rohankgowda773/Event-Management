import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink],
  template: `
  <nav class="navbar">
    <a routerLink="/events" class="nav-link">Events</a>
    <a routerLink="/admin/events" *ngIf="isAdmin" class="nav-link">Admin</a>
    <a routerLink="/login" *ngIf="!isLoggedIn" class="nav-link">Login</a>
    <a routerLink="/register" *ngIf="!isLoggedIn" class="nav-link">Register</a>
    <a href="#" *ngIf="isLoggedIn" (click)="logout()" class="nav-link">Logout</a>
  </nav>
  <router-outlet></router-outlet>
  `,
  styles: [`
    body, html {
      margin: 0;
      font-family: Arial, sans-serif;
    }
    .navbar {
      background-color: #007bff;
      color: white;
      padding: 1rem 2rem;
      display: flex;
      gap: 1rem;
    }
    .nav-link {
      color: white;
      text-decoration: none;
      font-weight: bold;
    }
    .nav-link:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  `]
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
      console.log(this.isLoggedIn)
      this.isAdmin = false;

      if (loggedIn) {
        const token = this.authService.getToken();
        if (token) {
          try {
            const decoded: any = jwtDecode(token);
            // Assuming role is stored in 'role' claim
            this.isAdmin = decoded.role === 'ROLE_ADMIN';
          } catch (err) {
            this.isAdmin = false;
          }
        }
      }
    });
  }

  logout() {
    this.authService.logout();
    // Optionally navigate to home or login after logout
    this.router.navigate(['/login']);
  }
}
