package mattiapastorini.CapStone_FantaF1.Payloads;

import jakarta.validation.constraints.NotBlank;

public record LoginDTO(
        @NotBlank
        String email,
        @NotBlank
        String password

) {
}
