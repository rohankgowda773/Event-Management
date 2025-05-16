import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // If user is already logged in, redirect to events page
    this.authService.isLoggedIn().subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigate(['/events']);
      }
    });
  }

  onSubmit(): void {
    if (this.isLoading) return;

    this.isLoading = true;
    this.errorMessage = '';
    
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.token) {
          this.router.navigate(['/events']);
        } else {
          this.errorMessage = 'Login failed. Please try again.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Login failed. Please check your credentials and try again.';
      }
    });
  }
} 