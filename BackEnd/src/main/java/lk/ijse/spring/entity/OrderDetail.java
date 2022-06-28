package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class OrderDetail {
    @Id
    @GeneratedValue
    private int orderDetailId;
    private int orderQty;
    private double total;

    @ManyToOne
    private Orders order;
    @ManyToOne
    private Item item;


}
