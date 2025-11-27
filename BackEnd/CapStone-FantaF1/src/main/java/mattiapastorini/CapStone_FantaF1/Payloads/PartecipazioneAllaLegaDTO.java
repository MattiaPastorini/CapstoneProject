package mattiapastorini.CapStone_FantaF1.Payloads;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PartecipazioneAllaLegaDTO(
        @NotBlank(message = "Devi inserire il codice invito")
        String codiceInvito,
        @NotNull(message = "ID utente obbligatorio")
        Long userId
) {

}
