package com.example.eventmanagement.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

private final JwtTokenUtil jwtTokenUtil;
private final CustomUserDetailsService userDetailsService;

public JwtAuthenticationFilter(JwtTokenUtil jwtTokenUtil, CustomUserDetailsService
userDetailsService) {
this.jwtTokenUtil = jwtTokenUtil;
this.userDetailsService = userDetailsService;
}

@Override
protected void doFilterInternal(
HttpServletRequest request,
HttpServletResponse response,
FilterChain filterChain) throws ServletException, IOException {

final String header = request.getHeader("Authorization");
String username = null;
String jwt = null;

if (header != null && header.startsWith("Bearer ")) {
jwt = header.substring(7);
if (jwtTokenUtil.validateToken(jwt)) {
username = jwtTokenUtil.getUsernameFromJWT(jwt);
}
}

if (username != null && SecurityContextHolder.getContext().getAuthentication() == null)
{
UserDetails userDetails = userDetailsService.loadUserByUsername(username);
UsernamePasswordAuthenticationToken authenticationToken =
new UsernamePasswordAuthenticationToken(
userDetails,
null,
userDetails.getAuthorities()
);
authenticationToken.setDetails(new
WebAuthenticationDetailsSource().buildDetails(request));
SecurityContextHolder.getContext().setAuthentication(authenticationToken);
}

filterChain.doFilter(request, response);
}
}