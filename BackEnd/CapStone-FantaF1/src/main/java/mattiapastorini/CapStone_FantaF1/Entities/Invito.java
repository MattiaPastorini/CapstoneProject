package mattiapastorini.CapStone_FantaF1.Entities;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Invito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long legaId;
    private Long userId; // utente invitato
    private String message;
    private boolean accepted = false;

    public Invito() {
    }

    public Invito(Long legaId, Long userId, String message) {
        this.legaId = legaId;
        this.userId = userId;
        this.message = message;
    }


}