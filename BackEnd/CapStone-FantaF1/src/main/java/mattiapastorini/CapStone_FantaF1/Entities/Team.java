package mattiapastorini.CapStone_FantaF1.Entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class Team {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @ManyToOne
    private User president;   //presidente della squadra

    @ManyToMany
    private Set<Pilota> piloti= new HashSet<>();

}
