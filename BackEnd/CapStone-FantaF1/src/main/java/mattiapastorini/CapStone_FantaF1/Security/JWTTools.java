package mattiapastorini.CapStone_FantaF1.Security;


import mattiapastorini.CapStone_FantaF1.Entities.*;
import mattiapastorini.CapStone_FantaF1.Exceptions.UnauthorizedException;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.util.Date;


@Component
public class JWTTools {
    @Value("${JWT_SECRET}")
    private String secret;

    public String createToken(User user) {
        return Jwts
                .builder()
                .issuedAt(new Date(System.currentTimeMillis())).expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7))
                .subject(String.valueOf(user.getId()))
                .signWith(Keys.hmacShaKeyFor(secret.getBytes()))
                .compact();
    }

    public void verifyToken(String accessToken) {
        try {
            Jwts
                    .parser()
                    .verifyWith(Keys.hmacShaKeyFor(secret.getBytes()))
                    .build()
                    .parse(accessToken);
        } catch (Exception exception) {
            throw new UnauthorizedException("Ci sono stati errori nel token! Effettua di nuovo il login!");
        }
    }

    public Long extractIdFromToken(String accessToken) {
        return Long.valueOf(Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(secret.getBytes())).build()
                .parseSignedClaims(accessToken)
                .getPayload()
                .getSubject());
    }

}
