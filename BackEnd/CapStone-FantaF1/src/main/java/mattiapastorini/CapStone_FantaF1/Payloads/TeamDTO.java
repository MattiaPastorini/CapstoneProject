package mattiapastorini.CapStone_FantaF1.Payloads;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record TeamDTO(
        @NotBlank(message = "Il nome della squadra è obbligatorio!")
        String name,
        @NotNull(message = "L'ID del presidente è obbligatorio")
        Long presidentId,
        @NotNull(message = "Almeno 3 piloti")
        List<Long> piloti, // lista id piloti
        @NotNull(message = "L'ID della lega è obbligatorio")
        Long legaId
) {
}
