package mk.ukim.finki.stockedgemk.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StockRequest {
    @NotBlank(message = "Ticker is required")
    private String ticker;

    @NotBlank(message = "Company name is required")
    private String companyName;

    @NotBlank(message = "Sector is required")
    private String sector;

}
