package mattiapastorini.CapStone_FantaF1.Controller;

import mattiapastorini.CapStone_FantaF1.Payloads.NewUserDTO;
import mattiapastorini.CapStone_FantaF1.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    // Registrazione
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody NewUserDTO newUserDto) {
        if (userService.register(newUserDto)) {
            // OK, utente creato
            return ResponseEntity.ok("ok");
        } else {
            // Email già registrata
            return ResponseEntity.status(409).body("Email in uso");
        }
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody NewUserDTO newUserDto) {
        // Qui puoi farti inviare solo email e password se vuoi
        if (userService.login(newUserDto.email(), newUserDto.password())) {
            return ResponseEntity.ok("ok");
        } else {
            return ResponseEntity.status(401).body("Credenziali errate");
        }
    }
}