package mattiapastorini.CapStone_FantaF1.Payloads;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


public record InvitoDTO(
        @NotNull(message = "ID lega obbligatorio")
        Long legaId,
        @NotBlank(message = "Serve username dell'amico")
        String username,
        @NotBlank(message = "Serve l'email dell'amico")
        String email
) {
}
