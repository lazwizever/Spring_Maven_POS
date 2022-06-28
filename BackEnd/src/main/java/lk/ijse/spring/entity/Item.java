package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.ArrayList;
import java.util.List;

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

    @ManyToMany(mappedBy = "orderItemList")
    List<Item> itemList = new ArrayList<>();

}
