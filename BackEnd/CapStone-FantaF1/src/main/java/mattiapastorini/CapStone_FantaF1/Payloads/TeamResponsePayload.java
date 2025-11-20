package mattiapastorini.CapStone_FantaF1.Payloads;

import mattiapastorini.CapStone_FantaF1.Entities.*;


import java.util.List;
import java.util.stream.Collectors;

public class TeamResponsePayload {
    public String name;
    public List<Long> piloti;
    public Long legaId;
    public String legaName;

    public TeamResponsePayload(Team team) {


        this.name = team.getName();
        this.piloti = team.getPiloti() != null
                ? team.getPiloti().stream().map(Pilota::getId).collect(Collectors.toList())
                : List.of(); // Nessun pilota
        this.legaId = team.getLega().getId();
        this.legaName = team.getLega().getName();
    }
}

