package mattiapastorini.CapStone_FantaF1.Controller;

import mattiapastorini.CapStone_FantaF1.Payloads.LoginDTO;
import mattiapastorini.CapStone_FantaF1.Payloads.NewUserDTO;
import mattiapastorini.CapStone_FantaF1.Entities.User;
import mattiapastorini.CapStone_FantaF1.Security.JWTTools;
import mattiapastorini.CapStone_FantaF1.Services.UserService;
import mattiapastorini.CapStone_FantaF1.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JWTTools jwtTools;


    // Registrazione
    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody NewUserDTO newUserDto) {
        boolean success = userService.register(newUserDto);
        if (success) {
            return Map.of("message", "ok");
        } else {
            return Map.of("message", "Email in uso");
        }
    }


    // Login
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginDTO loginDto) {
        Optional<User> user = userRepository.findByEmail(loginDto.email());
        if (user.isPresent() && user.get().getPassword().equals(loginDto.password())) {
            String accessToken = jwtTools.createToken(user.get());
            System.out.println("token generato: " + accessToken);
            // Risposta OK: id, username, accessToken
            return Map.of(
                    "id", user.get().getId(),
                    "username", user.get().getUsername(),
                    "accessToken", accessToken
            );
        } else {
            // Risposta ERRORE (puoi anche definire uno status personalizzato se vuoi)
            return Map.of("message", "Credenziali errate");
        }
    }

}
