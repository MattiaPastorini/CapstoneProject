package mattiapastorini.CapStone_FantaF1.Services;


import mattiapastorini.CapStone_FantaF1.Email.MailService;
import mattiapastorini.CapStone_FantaF1.Entities.User;
import mattiapastorini.CapStone_FantaF1.Payloads.NewUserDTO;
import mattiapastorini.CapStone_FantaF1.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service // Dice a Spring che questa è una classe di servizio (logica applicativa)
public class UserService {
    @Autowired // Inietto automaticamente il repository
    private UserRepository userRepository;
    @Autowired
    private MailService mailService;

    // Metodo per registrare un utente
    public boolean register(NewUserDTO newUserDto) {
        // Controllo se l'utente esiste già usando l'email
        if (userRepository.findByEmail(newUserDto.email()).isPresent()) {
            // Email già usata
            return false;
        }
        // Creo l'entità utente e la salvo
        User nuovo = new User();
        nuovo.setEmail(newUserDto.email());
        nuovo.setUsername(newUserDto.username());
        // Qui bisognerebbe cifrare la password!
        nuovo.setPassword(newUserDto.password());
        userRepository.save(nuovo);


        // Invio email
        try {
            mailService.sendRegistrationEmail(nuovo.getEmail(), nuovo.getUsername());
        } catch (Exception e) {
            // Logga l'errore ma non bloccare la registrazione
            System.err.println("Errore invio mail: " + e.getMessage());
        }
        return true;
    }

    // Metodo per login
    public boolean login(String email, String password) {
        // Cerco l'utente per email
        Optional<User> utente = userRepository.findByEmail(email);
        // Se trovato, controllo la password (in vero progetto confronta hash)
        return utente.isPresent() && utente.get().getPassword().equals(password);
    }

    // Trova un utente per ID, lancia eccezione se non trovato
    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utente non trovato con ID: " + id));
    }

}
