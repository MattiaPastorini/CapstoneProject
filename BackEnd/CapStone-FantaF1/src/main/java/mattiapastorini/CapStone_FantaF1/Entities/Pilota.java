package mattiapastorini.CapStone_FantaF1.Entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class Pilota {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "Nome", nullable = false)
    private String nome;
    @Column(name = "Scuderia", nullable = false)
    private String scuderia;

    @ManyToMany(mappedBy = "piloti")
    private Set<Team> teams = new HashSet<>();


}
