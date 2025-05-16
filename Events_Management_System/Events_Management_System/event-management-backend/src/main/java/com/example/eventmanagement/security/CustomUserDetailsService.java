
package com.example.eventmanagement.security;

import com.example.eventmanagement.model.User;
import com.example.eventmanagement.repository.UserRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

private final UserRepository userRepository;

public CustomUserDetailsService(UserRepository repo) {
this.userRepository = repo;
}

@Override
public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
{
User user = userRepository.findByUsername(username)
.orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
return new org.springframework.security.core.userdetails.User(
user.getUsername(),
user.getPassword(),
Collections.singleton(new SimpleGrantedAuthority(user.getRole()))
);
}
}

