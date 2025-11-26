package mattiapastorini.CapStone_FantaF1.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
public class Pilota {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "Nome", nullable = false)
    private String nome;
    @Column(name = "Scuderia", nullable = false)
    private String scuderia;
    @Column(name = "Punti")
    private Integer punti;

    @ManyToMany(mappedBy = "piloti")
    private Set<Team> teams = new HashSet<>();


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Pilota pilota = (Pilota) o;
        return id != null && id.equals(pilota.id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

}
