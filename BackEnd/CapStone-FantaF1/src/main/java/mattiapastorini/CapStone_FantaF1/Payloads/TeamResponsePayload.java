package mattiapastorini.CapStone_FantaF1.Payloads;

import mattiapastorini.CapStone_FantaF1.Entities.*;


import java.util.List;
import java.util.stream.Collectors;

public class TeamResponsePayload {
    public Long id;
    public String name;
    public List<Long> piloti;
    public Long legaId;
    public String legaName;

    public TeamResponsePayload(Team team) {
        this.id = team.getId();
        this.name = team.getName();
        this.piloti = team.getPiloti() == null
                ? List.of()
                : team.getPiloti().stream().map(Pilota::getId).toList();
        this.legaId = team.getLega().getId();
        this.legaName = team.getLega().getName();
    }

}

