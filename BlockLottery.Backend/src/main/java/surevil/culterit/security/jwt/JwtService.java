package surevil.culterit.security.jwt;

import io.jsonwebtoken.Claims;
import surevil.culterit.entity.account.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;

public interface JwtService {

    Claims getClaimsFromToken(String token);

    String getUsernameFromToken(String token);

    JwtUser convertUserToJwtUser(User user);

    Date generateExpirationDate(long expiration);

    boolean validateToken(String authToken);

    String generateToken(UserDetails userDetails, long expiration);
}
