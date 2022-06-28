package lk.ijse.spring.service;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.ItemDTO;

import java.util.List;

public interface PlaceOrderService {
    List<String> getAllCustomerIds();

    CustomerDTO getCustomer(String id);

    ItemDTO getItem(String id);

    List<String> getAllItemIds();
}
