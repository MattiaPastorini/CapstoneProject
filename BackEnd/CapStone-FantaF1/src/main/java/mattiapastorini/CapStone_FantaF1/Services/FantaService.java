package mattiapastorini.CapStone_FantaF1.Services;

import mattiapastorini.CapStone_FantaF1.Entities.*;
import mattiapastorini.CapStone_FantaF1.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class FantaService {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private LegaRepository legaRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PilotaRepository pilotaRepository;

    // Crea squadra
    public Team creazioneTeam(String name, Long presidentId, List<Long> pilotiId) {
        User president = userRepository.findById(presidentId).orElseThrow();
        Team team = new Team();
        team.setName(name);
        team.setPresident(president);

        // Trova i piloti dal repository e aggiungili al team
        List<Pilota> piloti = pilotaRepository.findAllById(pilotiId);
        team.getPiloti().addAll(piloti);

        return teamRepository.save(team);
    }

    // Crea lega
    public Lega creazioneLega(String name, Long presidentId) {
        User president = userRepository.findById(presidentId).orElseThrow();
        Lega lega = new Lega();
        lega.setName(name);
        lega.setPresident(president);
        lega.setCodiceInvito(generateRandomCode());
        lega.setMembers(new HashSet<>());
        lega.getMembers().add(president); // president è già dentro
        return legaRepository.save(lega);
    }

    // Invita (aggiungi membro per email/username)
    public boolean invitoAllaLega(Long legaId, String username, String email) {
        Lega lega = legaRepository.findById(legaId).orElseThrow();
        Optional<User> friend = email.contains("@")
                ? userRepository.findByEmail(email)
                : userRepository.findByUsername(username);

        if (friend.isPresent()) {
            // Aggiungi l'amico se non già dentro
            return lega.getMembers().add(friend.get());
        }
        return false;
    }

    // Join tramite codice invito
    public boolean partecipazioneAllaLega(String code, Long userId) {
        Optional<Lega> optLega = legaRepository.findByCodiceInvito(code);
        if (optLega.isPresent()) {
            Lega lega = optLega.get();
            User user = userRepository.findById(userId).orElseThrow();
            return lega.getMembers().add(user);
        }
        return false;
    }

    // Genera codice invito (esempio base)
    private String generateRandomCode() {
        return java.util.UUID.randomUUID().toString().substring(0, 8);
    }
}
