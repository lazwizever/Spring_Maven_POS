package lk.ijse.spring.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ItemDTO {
    private String itemId;
    private String description;
    private String packSize;
    private double unitPrice;
    private int inputQTY;

}
