package mattiapastorini.CapStone_FantaF1.Controller;

import mattiapastorini.CapStone_FantaF1.Entities.*;
import mattiapastorini.CapStone_FantaF1.Payloads.*;
import mattiapastorini.CapStone_FantaF1.Services.FantaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class FantaController {
    @Autowired
    private FantaService fantaService;

    // Crea una squadra
    @PostMapping("/team/creazione")
    public ResponseEntity<?> creazioneTeam(@RequestBody TeamDTO teamDTO) {
        // Recupera l'ID user loggato come preferisci, qui ipotizzo che venga passato
        Team creato = fantaService.creazioneTeam(teamDTO.name(), teamDTO.presidentId(), teamDTO.piloti());
        return ResponseEntity.ok(creato);
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
}
