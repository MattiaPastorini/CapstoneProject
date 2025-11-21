package mattiapastorini.CapStone_FantaF1.Entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Invito invito = (Invito) o;
        return id != null && id.equals(invito.id);
    }

    @Override
    public int hashCode() {
        return 31;
    }
}