package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.util.ArrayList;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Orders {
    @Id
    private String orderId;
    private String cusId;
    private String orderDate;
    private double total;

    @ManyToOne
    private Customer customer;


    @ManyToMany
    private
    List<Item> itemList = new ArrayList<>();
}
