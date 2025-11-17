package mattiapastorini.CapStone_FantaF1.Entities;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Utenti")
@Data // Lombok genera getter, setter, toString automaticamente
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)

    private String password;

}
