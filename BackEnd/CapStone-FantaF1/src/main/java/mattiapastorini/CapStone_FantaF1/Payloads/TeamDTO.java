package mattiapastorini.CapStone_FantaF1.Payloads;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TeamDTO(
        @NotBlank(message = "Il nome della squadra è obbligatorio!")
        String name,
        @NotNull(message = "L'ID del presidente è obbligatorio")
        Long presidentId
) {
}
