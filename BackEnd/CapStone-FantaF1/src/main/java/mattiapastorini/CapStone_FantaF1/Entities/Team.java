package mattiapastorini.CapStone_FantaF1.Entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Team")
@Data
public class Team {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @ManyToOne
    private User president;   //presidente della squadra

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "team_piloti",
            joinColumns = @JoinColumn(name = "team_id"),
            inverseJoinColumns = @JoinColumn(name = "pilota_id")
    )
    private Set<Pilota> piloti = new HashSet<>();


    @ManyToOne
    private Lega lega; // ogni Team appartiene a una lega


}
