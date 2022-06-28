package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.ItemDTO;
import lk.ijse.spring.entity.Customer;
import lk.ijse.spring.entity.Item;
import lk.ijse.spring.repo.CustomerRepo;
import lk.ijse.spring.repo.ItemRepo;
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

}
