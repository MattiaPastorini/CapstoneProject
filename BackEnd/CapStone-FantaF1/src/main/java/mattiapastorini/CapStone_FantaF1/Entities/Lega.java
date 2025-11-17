package mattiapastorini.CapStone_FantaF1.Entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Lega")
@Data
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
}
