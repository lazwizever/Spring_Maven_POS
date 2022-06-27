package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@NoArgsConstructor
@AllArgsConstructor
@Data

@Entity
public class Item {
    @Id
    private String itemId;
    private String description;
    private String packSize;
    private double unitPrice;
    private int inputQTY;

}
