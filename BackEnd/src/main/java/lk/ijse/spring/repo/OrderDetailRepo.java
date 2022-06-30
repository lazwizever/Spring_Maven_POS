package lk.ijse.spring.repo;

import lk.ijse.spring.entity.OrderDetail;
import lk.ijse.spring.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderDetailRepo extends JpaRepository<OrderDetail,Integer> {

    List<OrderDetail> findByOrder(Orders orders);


}
