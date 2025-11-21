package mattiapastorini.CapStone_FantaF1.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Lega")
@Getter
@Setter
public class Lega {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String codiceInvito;

    @ManyToOne
    private User president; //creatore della lega

    @ManyToMany
    private Set<User> members = new HashSet<>();  //utenti invitati o partecipanti

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Lega lega = (Lega) o;
        return id != null && id.equals(lega.id);
    }

    @Override
    public int hashCode() {
        return 31;
    }
}

