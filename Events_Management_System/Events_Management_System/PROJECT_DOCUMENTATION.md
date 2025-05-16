# EventFlow - Event Management System Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Architecture](#architecture)
3. [Features](#features)
4. [Technical Stack](#technical-stack)
5. [Setup Guide](#setup-guide)
6. [Database Schema](#database-schema)
7. [API Documentation](#api-documentation)
8. [Frontend Components](#frontend-components)
9. [Backend Services](#backend-services)
10. [Security Implementation](#security-implementation)
11. [Troubleshooting](#troubleshooting)

## System Overview

EventFlow is a full-stack event management application that enables users to create, manage, and track events. The system provides a secure authentication mechanism and role-based access control, ensuring that only authorized users can perform specific actions.

### Key Features
- User authentication and authorization
- Event creation and management
- Real-time event status tracking
- Responsive user interface
- Role-based access control

## Architecture

The application follows a client-server architecture:

```
Client (Angular) <---> Server (Spring Boot) <---> Database (MySQL/PostgreSQL)
```

### Frontend Architecture
- Angular components for UI rendering
- Services for API communication
- Guards for route protection
- Models for type definitions

### Backend Architecture
- RESTful API endpoints
- Service layer for business logic
- Repository layer for data access
- Security configuration for authentication

## Features

### 1. Authentication System
- Login functionality
- Registration system
- JWT-based authentication
- Role-based access control

### 2. Event Management
- Create new events
- View event details
- Edit existing events
- Delete events
- Event status tracking

### 3. User Interface
- Responsive design
- Interactive components
- Loading states
- Error handling
- Form validation

## Technical Stack

### Frontend
- Angular 17
- TypeScript
- HTML5/CSS3
- RxJS
- Angular Material (optional)

### Backend
- Spring Boot
- Java
- Spring Security
- JPA/Hibernate
- MySQL/PostgreSQL

## Setup Guide

### Prerequisites
1. Node.js (LTS version)
2. JDK 17 or later
3. Maven
4. MySQL/PostgreSQL

### Backend Setup
1. Navigate to the backend directory:
```bash
cd event-management-backend
```

2. Configure database properties in `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/event_management
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. Build and run the application:
```bash
mvn clean install
mvn spring-boot:run
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd event-management-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Access the application at `http://localhost:4200`

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL
);
```

### Events Table
```sql
CREATE TABLE events (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    event_date_time DATETIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    active BOOLEAN DEFAULT true
);
```

## API Documentation

### Authentication Endpoints

#### Login
- **URL**: `/api/auth/login`
- **Method**: POST
- **Body**:
```json
{
    "username": "string",
    "password": "string"
}
```
- **Response**:
```json
{
    "token": "string",
    "username": "string",
    "role": "string"
}
```

#### Register
- **URL**: `/api/auth/register`
- **Method**: POST
- **Body**:
```json
{
    "username": "string",
    "email": "string",
    "password": "string"
}
```

### Event Endpoints

#### Get All Events
- **URL**: `/api/events`
- **Method**: GET
- **Headers**: `Authorization: Bearer {token}`

#### Get Event by ID
- **URL**: `/api/events/{id}`
- **Method**: GET
- **Headers**: `Authorization: Bearer {token}`

#### Create Event
- **URL**: `/api/events`
- **Method**: POST
- **Headers**: `Authorization: Bearer {token}`
- **Body**:
```json
{
    "title": "string",
    "description": "string",
    "eventDateTime": "datetime",
    "location": "string"
}
```

#### Update Event
- **URL**: `/api/events/{id}`
- **Method**: PUT
- **Headers**: `Authorization: Bearer {token}`
- **Body**: Same as Create Event

#### Delete Event
- **URL**: `/api/events/{id}`
- **Method**: DELETE
- **Headers**: `Authorization: Bearer {token}`

## Frontend Components

### 1. Authentication Components
- `LoginComponent`: Handles user login
- `RegisterComponent`: Handles user registration
- `AuthGuard`: Protects routes requiring authentication

### 2. Event Components
- `EventsComponent`: Displays list of events
- `EventDetailsComponent`: Shows detailed event information
- `CreateEventComponent`: Form for creating new events
- `EditEventComponent`: Form for editing existing events

### 3. Shared Components
- `HeaderComponent`: Navigation and user information
- `LoadingSpinnerComponent`: Loading state indicator
- `ErrorComponent`: Error message display

## Backend Services

### 1. Authentication Service
- User registration
- User login
- JWT token generation
- Password encryption

### 2. Event Service
- CRUD operations for events
- Event status management
- Data validation

### 3. User Service
- User management
- Role management
- Profile updates

## Security Implementation

### JWT Authentication
1. User login generates JWT token
2. Token stored in localStorage
3. Token included in API requests
4. Backend validates token

### Role-Based Access
- ADMIN: Full access
- USER: Limited access
- GUEST: Read-only access

## Troubleshooting

### Common Issues

1. **Port 4200 Already in Use**
```bash
# Find process using port 4200
netstat -ano | findstr :4200
# Kill the process
taskkill /PID <process_id> /F
```

2. **Database Connection Issues**
- Verify database credentials
- Check database service is running
- Ensure correct database URL

3. **Authentication Errors**
- Clear browser localStorage
- Verify JWT token format
- Check token expiration

### Development Tips

1. **Frontend Development**
- Use Angular DevTools for debugging
- Enable source maps for better debugging
- Use RxJS operators for complex operations

2. **Backend Development**
- Enable debug logging in application.properties
- Use Postman for API testing
- Monitor Hibernate SQL queries

## Best Practices

1. **Code Organization**
- Follow Angular style guide
- Use TypeScript interfaces
- Implement proper error handling

2. **Security**
- Never store sensitive data in localStorage
- Implement proper input validation
- Use HTTPS in production

3. **Performance**
- Implement lazy loading
- Use proper caching strategies
- Optimize database queries

## Deployment

### Frontend Deployment
1. Build the application:
```bash
ng build --prod
```

2. Deploy the `dist` folder to your web server

### Backend Deployment
1. Build the JAR file:
```bash
mvn clean package
```

2. Run the JAR:
```bash
java -jar target/event-management-backend.jar
```

## Support

For issues and feature requests, please create an issue in the GitHub repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 