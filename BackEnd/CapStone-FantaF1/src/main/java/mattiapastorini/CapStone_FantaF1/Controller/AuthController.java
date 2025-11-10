package mattiapastorini.CapStone_FantaF1.Controller;

import mattiapastorini.CapStone_FantaF1.Payloads.NewUserDTO;
import mattiapastorini.CapStone_FantaF1.Entities.User;
import mattiapastorini.CapStone_FantaF1.Services.UserService;
import mattiapastorini.CapStone_FantaF1.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    // Registrazione
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody NewUserDTO newUserDto) {
        if (userService.register(newUserDto)) {
            return ResponseEntity.ok("ok");
        } else {
            return ResponseEntity.status(409).body("Email in uso");
        }
    }

    // Login RESTITUISCE L'UTENTE!
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody NewUserDTO newUserDto) {
        Optional<User> user = userRepository.findByEmail(newUserDto.email());
        if (user.isPresent() && user.get().getPassword().equals(newUserDto.password())) {
            // Qui restituisci l'intero oggetto utente (id, username, email, ...)
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(401).body("Credenziali errate");
        }
    }
}
