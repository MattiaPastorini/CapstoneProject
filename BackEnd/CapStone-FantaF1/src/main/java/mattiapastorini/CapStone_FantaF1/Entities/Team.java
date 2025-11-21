package mattiapastorini.CapStone_FantaF1.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Team")
@Getter
@Setter
public class Team {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @ManyToOne
    private User president;   //presidente della squadra

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "team_piloti",
            joinColumns = @JoinColumn(name = "team_id"),
            inverseJoinColumns = @JoinColumn(name = "pilota_id")
    )
    private Set<Pilota> piloti = new HashSet<>();


    @ManyToOne
    private Lega lega; // ogni Team appartiene a una lega

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Team team = (Team) o;
        return id != null && id.equals(team.id);
    }

    @Override
    public int hashCode() {
        return 31;
    }


}
