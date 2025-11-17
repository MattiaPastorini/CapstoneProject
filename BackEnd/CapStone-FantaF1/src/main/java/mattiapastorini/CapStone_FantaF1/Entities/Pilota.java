package mattiapastorini.CapStone_FantaF1.Entities;

import jakarta.persistence.*;
import lombok.Data;

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

}
