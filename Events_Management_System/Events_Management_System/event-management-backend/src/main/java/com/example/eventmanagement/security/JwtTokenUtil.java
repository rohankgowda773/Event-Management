
package com.example.eventmanagement.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtTokenUtil {

@Value("${jwt.secret}")
private String jwtSecret;

@Value("${jwt.expiration}")
private long jwtExpirationInMs;

public String generateToken(String username) {
Date now = new Date();
Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);
return Jwts.builder()
.setSubject(username)
.setIssuedAt(now)
.setExpiration(expiryDate)
.signWith(SignatureAlgorithm.HS512, jwtSecret)
.compact();
}

public String getUsernameFromJWT(String token) {
return Jwts.parser()
.setSigningKey(jwtSecret)
.parseClaimsJws(token)
.getBody()
.getSubject();
}

public boolean validateToken(String authToken) {
try {
Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
return true;
} catch (SignatureException | MalformedJwtException | ExpiredJwtException | UnsupportedJwtException | IllegalArgumentException ex) {
//log error could be added here
}
return false;
}
}
