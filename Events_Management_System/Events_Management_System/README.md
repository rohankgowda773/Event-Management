# 🎉 EventFlow - Modern Event Management System

> Transform the way you manage events with EventFlow - A sleek, intuitive, and powerful event management solution built for the modern world.

![EventFlow Banner](https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)

## ✨ Why EventFlow?

In today's fast-paced world, managing events shouldn't be a headache. EventFlow brings together the power of modern web technologies to create a seamless event management experience. Whether you're organizing a corporate conference, workshop, or community gathering, EventFlow has got you covered.

### 🌟 Key Features

- **🔐 Smart Authentication**
  - Secure login and registration
  - Role-based access control
  - Protected routes and resources

- **📅 Intuitive Event Management**
  - Create and manage events with ease
  - Real-time event status tracking
  - Detailed event information display
  - Interactive event cards with dynamic images

- **🎨 Beautiful User Interface**
  - Modern, responsive design
  - Smooth animations and transitions
  - Intuitive navigation
  - Mobile-first approach

## 🛠️ Built With

### Frontend
- **Angular 17** - The latest version of the powerful frontend framework
- **TypeScript** - For type-safe, maintainable code
- **HTML5/CSS3** - Modern web standards
- **RxJS** - Reactive programming for better state management

### Backend
- **Spring Boot** - Robust Java-based backend framework
- **Spring Security** - Enterprise-grade security
- **JPA/Hibernate** - Efficient database operations
- **MySQL/PostgreSQL** - Reliable data storage

## 🚀 Getting Started

### Prerequisites
- Node.js (LTS version)
- JDK 17 or later
- Maven
- MySQL/PostgreSQL

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/event-management.git
cd event-management
```

2. **Backend Setup**
```bash
cd event-management-backend
mvn clean install
mvn spring-boot:run
```

3. **Frontend Setup**
```bash
cd event-management-frontend
npm install
ng serve
```

4. **Access the application**
- Frontend: http://localhost:4200
- Backend API: http://localhost:8080

## 📁 Project Structure

```
event-management/
├── event-management-frontend/     # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/       # Angular components
│   │   │   ├── services/        # API services
│   │   │   ├── models/          # TypeScript interfaces
│   │   │   └── guards/          # Route guards
│   │   └── assets/              # Static assets
│   └── package.json
│
└── event-management-backend/      # Spring Boot backend
    ├── src/
    │   ├── main/
    │   │   ├── java/            # Java source files
    │   │   └── resources/       # Configuration files
    │   └── test/                # Test files
    └── pom.xml
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Events
- `GET /api/events` - Get all events
- `GET /api/events/{id}` - Get event by ID
- `POST /api/events` - Create new event
- `PUT /api/events/{id}` - Update event
- `DELETE /api/events/{id}` - Delete event

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Angular Team for the amazing framework
- Spring Team for the robust backend framework
- All contributors who have helped shape this project

## 📞 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)
Project Link: [https://github.com/yourusername/event-management](https://github.com/yourusername/event-management)

---

⭐ Star this repository if you find it helpful! 