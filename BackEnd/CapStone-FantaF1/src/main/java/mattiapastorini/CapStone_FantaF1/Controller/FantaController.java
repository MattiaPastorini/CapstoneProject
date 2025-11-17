package mattiapastorini.CapStone_FantaF1.Controller;

import mattiapastorini.CapStone_FantaF1.Entities.*;
import mattiapastorini.CapStone_FantaF1.Payloads.*;
import mattiapastorini.CapStone_FantaF1.Repositories.LegaRepository;
import mattiapastorini.CapStone_FantaF1.Repositories.PilotaRepository;
import mattiapastorini.CapStone_FantaF1.Repositories.TeamRepository;
import mattiapastorini.CapStone_FantaF1.Repositories.UserRepository;
import mattiapastorini.CapStone_FantaF1.Services.FantaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class FantaController {
    @Autowired
    private FantaService fantaService;
    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private LegaRepository legaRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PilotaRepository pilotaRepository;

    // Crea una squadra
    @PostMapping("/team/creazione")
    public ResponseEntity<?> creazioneTeam(@RequestBody TeamDTO teamDTO) {
        if (teamDTO.presidentId() == null) {
            return ResponseEntity.badRequest().body("ID presidente mancante");
        }
        // Recupera l'ID user loggato come preferisci, qui ipotizzo che venga passato
        Team creato = fantaService.creazioneTeam(teamDTO.name(), teamDTO.presidentId(), teamDTO.piloti(), teamDTO.legaId());
        return ResponseEntity.ok(creato);
    }

    // Restituisce la squadra associata al presidentId passato
    @GetMapping("/team/utente/{userId}")
    public ResponseEntity<?> getTeamsByUser(@PathVariable Long userId) {
        List<Team> teams = fantaService.getTeamsByPresident(userId);
        List<Map<String, Object>> result = teams.stream().map(team -> {
            Map<String, Object> m = new HashMap<>();
            m.put("name", team.getName());
            m.put("piloti", team.getPiloti().stream().map(Pilota::getId).toList());
            m.put("legaId", team.getLega().getId());
            m.put("legaName", team.getLega().getName());
            return m;
        }).toList();
        return ResponseEntity.ok(result);
    }


    // Crea una lega
    @PostMapping("/lega/creazione")
    public ResponseEntity<?> creazioneLega(@RequestBody LegaDTO legaDTO) {
        Lega creata = fantaService.creazioneLega(legaDTO.name(), legaDTO.presidentId());
        return ResponseEntity.ok(creata);
    }

    // Invita un amico a una lega (per email o username)
    @PostMapping("/lega/invito")
    public ResponseEntity<?> invito(@RequestBody InvitoDTO invitoDTO) {
        boolean ok = fantaService.invitoAllaLega(invitoDTO.legaId(), invitoDTO.username(), invitoDTO.email());
        return ok ? ResponseEntity.ok("Invitato!") : ResponseEntity.status(404).body("Utente non trovato");
    }

    // Un utente entra in lega tramite codice invito
    @PostMapping("/lega/partecipazione")
    public ResponseEntity<?> partecipazione(@RequestBody PartecipazioneAllaLegaDTO partecipazioneAllaLegaDTO) {
        boolean ok = fantaService.partecipazioneAllaLega(partecipazioneAllaLegaDTO.codiceInvito(), partecipazioneAllaLegaDTO.userId());
        return ok ? ResponseEntity.ok("Entrato!") : ResponseEntity.status(404).body("Lega non trovata o già membro");
    }


    @GetMapping("/lega/utente/{userId}")
    public ResponseEntity<?> getLeagueByMember(@PathVariable Long userId) {
        Lega lega = fantaService.getLegaByUserId(userId);
        if (lega != null) {
            return ResponseEntity.ok(lega);
        } else {
            return ResponseEntity.ok().body(null);
        }
    }

    @GetMapping("/team/utente/{userId}/lega/{legaId}")
    public ResponseEntity<?> getTeamByUserAndLeague(@PathVariable Long userId, @PathVariable Long legaId) {
        User user = userRepository.findById(userId).orElseThrow();
        Lega lega = legaRepository.findById(legaId).orElseThrow();
        Team team = teamRepository.findByPresidentAndLega(user, lega);
        if (team == null)
            return ResponseEntity.ok().body(null);
        Map<String, Object> result = Map.of(
                "name", team.getName(),
                "piloti", team.getPiloti().stream().map(Pilota::getId).toList(),
                "lega", team.getLega().getName(),
                "legaId", team.getLega().getId()
        );
        return ResponseEntity.ok(result);
    }


}
