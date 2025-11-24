package mattiapastorini.CapStone_FantaF1.Services;

import mattiapastorini.CapStone_FantaF1.Entities.*;
import mattiapastorini.CapStone_FantaF1.Exceptions.ResourceNotFoundException;
import mattiapastorini.CapStone_FantaF1.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Autowired
    private InvitoRepository invitoRepository;

    // Crea squadra
    public Team creazioneTeam(String name, Long presidentId, List<Long> pilotiId, Long legaId) {
        if (presidentId == null) {
            throw new IllegalArgumentException("L'ID presidente non può essere nullo");
        }
        if (legaId == null) {
            throw new IllegalArgumentException("L'ID lega non può essere nullo");
        }
        User president = userRepository.findById(presidentId).orElseThrow();
        Lega lega = legaRepository.findById(legaId).orElseThrow();

        // Limite max 3 squadre per utente
        List<Team> squadre = teamRepository.findByPresident(president);
        if (squadre.size() >= 3) throw new IllegalStateException("Puoi avere massimo 3 squadre (una per lega)");

        // Squadra unica per lega
        if (teamRepository.findByPresidentAndLega(president, lega) != null) {
            throw new IllegalStateException("Hai già una squadra in questa lega!");
        }

        Team team = new Team();
        team.setName(name);
        team.setPresident(president);
        team.setLega(lega);

        // Carica i piloti scelti
        List<Pilota> piloti = pilotaRepository.findAllById(pilotiId);

        // Associa piloti al team (ManyToMany, con cascade)
        team.getPiloti().addAll(piloti);

        // PATCH: aggiorna anche il lato Pilota (relazione bidirezionale!)
        for (Pilota p : piloti) {
            p.getTeams().add(team);
        }

        return teamRepository.save(team);
    }


    // QUERY AGGIORNATA: piloti sono caricati già nella entity grazie al JOIN FETCH, niente concurrent!
    public List<Team> getTeamsByPresident(Long userId) {
        User president = userRepository.findById(userId).orElse(null);
        if (president == null) return List.of();
        return teamRepository.findByPresidentWithPiloti(president);
    }


    // Crea lega
    public Lega creazioneLega(String name, Long presidentId) {
        User president = userRepository.findById(presidentId).orElseThrow();
        Lega esistente = legaRepository.findByPresident(president);
        if (esistente != null) throw new IllegalStateException("Hai già una lega!");
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
        // Cerca l'utente destinatario tramite username, se non trovato cerca via email
        User destinatario = null;
        if (username != null && !username.isBlank()) {
            destinatario = userRepository.findByUsername(username).orElse(null);
        }
        if (destinatario == null && email != null && !email.isBlank()) {
            destinatario = userRepository.findByEmail(email).orElse(null);
        }
        if (destinatario == null) return false; // Utente non trovato

        // Verifica che non sia già invitato
        if (invitoRepository.findByUserIdAndAcceptedFalse(destinatario.getId()).stream()
                .anyMatch(i -> i.getLegaId().equals(legaId))) {
            return false; // Già invitato a questa lega e non ha ancora accettato
        }

        // Crea l'invito
        Invito invito = new Invito();
        invito.setUserId(destinatario.getId());
        invito.setLegaId(legaId);
        invito.setAccepted(false); // Stato iniziale
        invito.setMessage("Sei stato invitato alla lega!");

        invitoRepository.save(invito);
        return true;
    }


    // Join tramite codice invito
    public boolean partecipazioneAllaLega(String code, Long userId) {
        Optional<Lega> optLega = legaRepository.findByCodiceInvito(code);
        if (optLega.isPresent()) {
            Lega lega = optLega.get();
            User user = userRepository.findById(userId).orElseThrow();
            if (userHasLeague(user)) return false;
            return lega.getMembers().add(user);
        }
        return false;
    }

    private boolean userHasLeague(User user) {
        return legaRepository.findByMembers_Id(user.getId()) != null
                || legaRepository.findByPresident(user) != null;
    }

    private String generateRandomCode() {
        return java.util.UUID.randomUUID().toString().substring(0, 8);
    }

    public Lega getLegaByUserId(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return null;
        Lega lega = legaRepository.findByPresident(user);
        if (lega == null) {
            lega = legaRepository.findByMembers_Id(userId);
        }
        return lega;
    }

    public Team getTeamByPresidentAndLega(Long userId, Long legaId) {
        User president = userRepository.findById(userId).orElse(null);
        Lega lega = legaRepository.findById(legaId).orElse(null);
        if (president == null || lega == null) return null;
        return teamRepository.findByPresidentAndLega(president, lega);
    }

    public void eliminaTeam(Long teamId) {
        Team found = teamRepository.findById(teamId).orElseThrow(() -> new RuntimeException("Team non trovato!"));
        found.getPiloti().clear();
        teamRepository.deleteById(teamId);
    }

    public void eliminaLega(Long legaId) {
        Lega found = legaRepository.findById(legaId).orElseThrow(() -> new RuntimeException("Lega non trovata!"));
        found.getMembers().clear();
        legaRepository.deleteById(legaId);
    }


//      Aggiorna i punti di una squadra
//
//      @param teamId id del team da aggiornare
//      @param nuoviPunti nuovo punteggio da assegnare
//      @return il team aggiornato

    @Transactional
    public Team aggiornaPuntiTeam(Long teamId, int nuoviPunti) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("Team non trovato!"));
        team.setPunti(nuoviPunti);
        return teamRepository.save(team); // restituisce l'entità aggiornata
    }

}
