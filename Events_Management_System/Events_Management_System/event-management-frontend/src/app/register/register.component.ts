import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  message: string = '';
  isError: boolean = false;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.isLoading) return;

    this.isLoading = true;
    this.message = '';
    this.isError = false;

    // Here you would typically call your registration service
    // For now, we'll just simulate a successful registration
    setTimeout(() => {
      this.isLoading = false;
      this.message = 'Registration successful! Redirecting to login...';
      this.isError = false;
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }, 1000);
  }
} 