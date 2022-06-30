package lk.ijse.spring.entity;

import lk.ijse.spring.dto.OrderDetailsDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
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

    @OneToMany(mappedBy = "order",cascade=CascadeType.ALL)
    private List<OrderDetail> itemList = new ArrayList();


    public Orders(String orderId, String cusId, String orderDate, double total, Customer customer) {
        this.orderId = orderId;
        this.cusId = cusId;
        this.orderDate = orderDate;
        this.total = total;
        this.customer = customer;
    }




}
