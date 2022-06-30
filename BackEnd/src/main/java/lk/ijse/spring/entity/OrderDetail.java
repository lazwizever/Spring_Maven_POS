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

    public OrderDetail(int orderQty, double total, Orders order, Item item) {
        this.orderQty = orderQty;
        this.total = total;
        this.order = order;
        this.item = item;
    }


}
