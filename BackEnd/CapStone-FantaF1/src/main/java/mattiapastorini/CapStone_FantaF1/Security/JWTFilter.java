package mattiapastorini.CapStone_FantaF1.Security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import mattiapastorini.CapStone_FantaF1.Entities.*;
import mattiapastorini.CapStone_FantaF1.Exceptions.*;
import mattiapastorini.CapStone_FantaF1.Services.*;

import java.io.IOException;

@Component
public class JWTFilter extends OncePerRequestFilter {

    @Autowired
    private JWTTools jwtTools;
    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
            response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
            response.setHeader("Access-Control-Allow-Credentials", "true");
            response.setStatus(HttpServletResponse.SC_OK);
            return;

        }

        // ********************************************************* AUTENTICAZIONE ************************************************************

        // 1. Verifichiamo se nella request esiste un header che si chiama Authorization, verifichiamo anche che sia fatto con il formato giusto
        // (Authorization: "Bearer 123j21389912391283..."). Se non c'è oppure se è nel formato sbagliato --> 401

        String authHeader = request.getHeader("Authorization");
        System.out.println("header ricevuto: " + authHeader);
        if (authHeader == null || !authHeader.startsWith("Bearer "))
            throw new UnauthorizedException("Inserire il token nell'authorization header nel formato giusto!");


        // 2. Se l'header esiste, estraiamo il token da esso
        // "Bearer 123j21389912391283..."

        String accessToken = authHeader.replace("Bearer ", "");

        // 3. Verifichiamo se il token è valido, cioè controlleremo se è stato modificato oppure no, se non è scaduto e se non è malformato

        jwtTools.verifyToken(accessToken);

        // 4. Se qualcosa non va con il token --> 401


        // ****************************************************** AUTORIZZAZIONE *************************************************************

        // 1. Cerchiamo l'utente nel db (l'id sta nel token!)
        // 1.1 Estraiamo l'id dal token

        Long userId = jwtTools.extractIdFromToken(accessToken);

        // 1.2 findById

        User found = userService.findById(userId); //CHIEDERE AD ANNA

        // 2. Associamo l'utente al Security Context

        Authentication authentication = new UsernamePasswordAuthenticationToken(found, null, found.getAuthorities()); //CHIEDERE AD ANNA
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 3. Se tutto è OK passiamo la richiesta al prossimo (che può essere o un altro filtro o direttamente il controller)

        filterChain.doFilter(request, response); // .doFilter chiama il prossimo elemento della catena (o un altro filtro o il controller direttamente)


    }

//    @Override
//    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
//        return new AntPathMatcher().match("/api/auth/**", request.getServletPath());
//        //                ||request.getMethod().equalsIgnoreCase("OPTIONS");
//
//        // Tutti gli endpoint nel controller "/auth/" non verranno controllati dal filtro
//    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getServletPath();
        System.out.println("Filter check -> path: " + path + ", method: " + request.getMethod());

        return path.startsWith("/api/auth/") ||
                "OPTIONS".equalsIgnoreCase(request.getMethod()) ||
                path.endsWith(".ico") || path.endsWith(".png") || path.endsWith(".jpg") || path.endsWith(".css") ||
                path.startsWith("/public/") || path.startsWith("/static/") ||
                path.equals("/") || path.startsWith("/swagger-ui/");
    }


}
