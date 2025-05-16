package com.example.eventmanagement.controller; import
            com.example.eventmanagement.model.Event; import
            com.example.eventmanagement.repository.EventRepository; import
            org.springframework.http.ResponseEntity; import
            org.springframework.web.bind.annotation.*; import java.util.List; import
            java.util.Optional; @RestController @RequestMapping("/api/events") public class
            EventController { private final EventRepository eventRepository; public
            EventController(EventRepository eventRepository) { this.eventRepository =
            eventRepository; } // Accessible to all authenticated users (ROLE_USER, ROLE_ADMIN)
            @GetMapping public List<Event> getAllEvents() { return eventRepository.findAll(); }
            @GetMapping("/{id}") public ResponseEntity<Event> getEventById(@PathVariable Long id) {
            Optional<Event> event = eventRepository.findById(id); return
            event.map(ResponseEntity::ok) .orElse(ResponseEntity.notFound().build()); } }