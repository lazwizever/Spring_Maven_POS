package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.ItemDTO;
import lk.ijse.spring.dto.OrderDTO;
import lk.ijse.spring.dto.OrderDetailsDTO;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.entity.Item;
import lk.ijse.spring.entity.OrderDetail;
import lk.ijse.spring.entity.Orders;
import lk.ijse.spring.repo.CustomerRepo;
import lk.ijse.spring.repo.ItemRepo;
import lk.ijse.spring.repo.OrderDetailRepo;
import lk.ijse.spring.repo.OrderRepo;
import lk.ijse.spring.service.PlaceOrderService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PlaceOrderServiceImpl implements PlaceOrderService {

    @Autowired
    CustomerRepo customerRepo;

    @Autowired
    ItemRepo itemRepo;

    @Autowired
    OrderRepo orderRepo;

    @Autowired
    OrderDetailRepo orderDetailRepo;


    @Autowired
    ModelMapper modelMapper;

    @Override
    public List<String> getAllCustomerIds() {
        List<String> cusIds = new ArrayList<>();
        List<Customer> temp = customerRepo.findAll();

        for (Customer customer : temp) {
            cusIds.add(customer.getCusId());
        }
        return cusIds;
    }

    @Override
    public CustomerDTO getCustomer(String id) {
       return modelMapper.map(customerRepo.findById(id).get(),CustomerDTO.class);
    }

    @Override
    public ItemDTO getItem(String id) {
        return modelMapper.map(itemRepo.findById(id).get(),ItemDTO.class);
    }

    @Override
    public List<String> getAllItemIds() {
        List<String> itemIds = new ArrayList<>();
        List<Item> item = itemRepo.findAll();

        for (Item temp : item) {
            itemIds.add(temp.getItemId());
        }
        return itemIds;
    }

    @Override
    public void saveOrder(OrderDTO orderDTO) {

       //modelMapper.map(orderDTO.getItemList(), new TypeToken<List<OrderDetail>>(){}.getType());

        List<OrderDetail> odList = new ArrayList<>();

        if (!orderRepo.existsById(orderDTO.getOrderId())){


        Orders orders = new Orders(orderDTO.getOrderId(),orderDTO.getCusId(),orderDTO.getOrderDate(),
                orderDTO.getTotal(),customerRepo.findById(orderDTO.getCusId()).get());
                orderRepo.save(orders);


        for (OrderDetailsDTO t : orderDTO.getItemList()) {

            OrderDetail orderDetail = new OrderDetail(
                    t.getOrderQty(),t.getTotal(),orders,itemRepo.findById(t.getItemCode()).get()
            );
            odList.add(orderDetail);

        }

            for (OrderDetail temp : odList) {
                System.out.println(temp.getItem().getItemId());
                orderDetailRepo.save(temp);

                Item item = temp.getItem();
                item.setInputQTY(item.getInputQTY() - temp.getOrderQty());
                itemRepo.save(item);

            }

            orders.setItemList(odList);
            orderRepo.save(orders);

        }else {
            throw new RuntimeException("Order already exist");
        }

    }

    @Override
    public OrderDTO searchOrder(String id) {
        if (orderRepo.existsById(id)){
            Orders orders = orderRepo.findById(id).get();
            List<OrderDetail> orderItemList = orderDetailRepo.findByOrder(orders);

            ArrayList<OrderDetailsDTO> list = new ArrayList<>();

            for (OrderDetail temp : orderItemList) {
                list.add(new OrderDetailsDTO(temp.getOrder().getOrderId(),temp.getItem().getItemId(),temp.getOrderQty(),temp.getTotal()));

            }

            OrderDTO od = modelMapper.map(orders, OrderDTO.class);
            od.setItemList(list);
            return od;
        }else {
            throw new RuntimeException("No order for "+id+"..!");
        }
    }


}
