package mattiapastorini.CapStone_FantaF1.Controller;

<<<<<<< HEAD
import mattiapastorini.CapStone_FantaF1.Entities.User;
import mattiapastorini.CapStone_FantaF1.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User userRegister(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        Optional<User> dataBaseUser = userRepository.findByEmail(user.getEmail());
        if (dataBaseUser.isPresent() && dataBaseUser.get().getPassword().equals(user.getPassword())) {
            return "ok";
        }
        return "ko";
    }
=======
public class AuthController {
>>>>>>> main
}
