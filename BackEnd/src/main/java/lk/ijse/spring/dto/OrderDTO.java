package lk.ijse.spring.dto;

import lk.ijse.spring.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.ArrayList;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class OrderDTO {
    private String orderId;
    private String cusId;
    private String orderDate;
    private double total;
    private ArrayList<OrderDetailsDTO> itemList;
}
