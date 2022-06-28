package lk.ijse.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Customer {
    @Id
    private String cusId;
    private String cusName;
    private String cusAddress;
    private String city;
    private String province;
    private int postalCode;

    @OneToMany(mappedBy = "customer")
    private
    List<Orders> orderList = new ArrayList<>();

}
