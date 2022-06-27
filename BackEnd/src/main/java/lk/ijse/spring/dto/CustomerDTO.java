package lk.ijse.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CustomerDTO {
    private String cusId;
    private String cusName;
    private String cusAddress;
    private String city;
    private String province;
    private int postalCode;
}
