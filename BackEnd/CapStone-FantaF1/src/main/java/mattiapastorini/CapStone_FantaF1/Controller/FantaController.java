package mattiapastorini.CapStone_FantaF1.Controller;

import mattiapastorini.CapStone_FantaF1.Entities.*;
import mattiapastorini.CapStone_FantaF1.Exceptions.*;
import mattiapastorini.CapStone_FantaF1.Payloads.*;
import mattiapastorini.CapStone_FantaF1.Repositories.*;
import mattiapastorini.CapStone_FantaF1.Services.FantaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    @Autowired
    private InvitoRepository invitoRepository;


    // Crea una squadra
    @PostMapping("/team/creazione")
    @ResponseStatus(HttpStatus.CREATED)
    public Team creazioneTeam(@RequestBody TeamDTO teamDTO) {
        Team creato = fantaService.creazioneTeam(teamDTO.name(), teamDTO.presidentId(), teamDTO.piloti(), teamDTO.legaId());
        return creato;
    }

    // Restituisce la squadra associata al presidentId passato
    @GetMapping("/team/utente/{userId}")
    public List<TeamResponsePayload> getTeamsByUser(@PathVariable Long userId) {
        List<Team> teams = fantaService.getTeamsByPresident(userId);
        return teams.stream()
                .map(TeamResponsePayload::new)
                .toList();
    }


    // Crea una lega
    @PostMapping("/lega/creazione")
    @ResponseStatus(HttpStatus.CREATED)
    public Lega creazioneLega(@RequestBody LegaDTO legaDTO) {
        Lega creata = fantaService.creazioneLega(legaDTO.name(), legaDTO.presidentId());
        return creata;
    }

    // Invita un amico a una lega (per email o username)
    @PostMapping("/lega/invito")
    public MessaggioDTO invito(@RequestBody InvitoDTO invitoDTO) {
        boolean ok = fantaService.invitoAllaLega(invitoDTO.legaId(), invitoDTO.username(), invitoDTO.email());
        String msg = ok ? "Invitato! Ora puoi accettare per entrare nella lega." : "Utente non trovato";
        return new MessaggioDTO(ok, msg);
    }

    // Un utente entra in lega tramite codice invito
    @PostMapping("/lega/partecipazione")
    public MessaggioDTO partecipazione(@RequestBody PartecipazioneAllaLegaDTO partecipazioneAllaLegaDTO) {
        boolean ok = fantaService.partecipazioneAllaLega(partecipazioneAllaLegaDTO.codiceInvito(), partecipazioneAllaLegaDTO.userId());
        String msg = ok ? "Entrato!" : "Lega non trovata o già membro";
        return new MessaggioDTO(ok, msg);
    }


    @GetMapping("/lega/utente/{userId}")
    public Lega getLeagueByMember(@PathVariable Long userId) {
        Lega lega = fantaService.getLegaByUserId(userId);
        if (lega != null) {
            return lega;
        } else {
            throw new ResourceNotFoundException("Lega non trovata per userId: " + userId);
        }
    }

    @GetMapping("/team/utente/{userId}/lega/{legaId}")
    public Map<String, Object> getTeamByUserAndLeague(@PathVariable Long userId, @PathVariable Long legaId) {
        User user = userRepository.findById(userId).orElseThrow();
        Lega lega = legaRepository.findById(legaId).orElseThrow();
        Team team = teamRepository.findByPresidentAndLega(user, lega);
        if (team == null)
            return null; // oppure puoi lanciare una exception custom se preferisci
        Map<String, Object> result = Map.of(
                "name", team.getName(),
                "piloti", team.getPiloti().stream().map(Pilota::getId).toList(),
                "lega", team.getLega().getName(),
                "legaId", team.getLega().getId()
        );
        return result;
    }


    @DeleteMapping("/team/elimina/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminaTeam(@PathVariable Long id) {
        if (teamRepository.existsById(id)) {
            teamRepository.deleteById(id);

        }
    }

    @DeleteMapping("/lega/elimina/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void eliminaLega(@PathVariable Long id) {

        if (legaRepository.existsById(id)) {
            legaRepository.deleteById(id);

        }
    }

    //  NOTIFICHE INVITI LEGA
    @GetMapping("/notifiche/{userId}")
    public List<Map<String, Object>> getInvitiLega(@PathVariable Long userId) {
        List<Invito> inviti = invitoRepository.findByUserIdAndAcceptedFalse(userId);

        return inviti.stream().map(invito -> {
            Map<String, Object> mappa = new HashMap<>();
            mappa.put("id", invito.getId());
            mappa.put("legaId", invito.getLegaId());
            mappa.put("message", invito.getMessage());
            mappa.put("accepted", invito.isAccepted());
            return mappa;
        }).collect(Collectors.toList());
    }


}
