package lk.ijse.spring.service;

import lk.ijse.spring.dto.CustomerDTO;

import java.util.List;

public interface CustomerService {

    void saveCustomer(CustomerDTO customerDTO);

    List<CustomerDTO> getAllCustomers();

    void UpdateCustomer(CustomerDTO customerDTO);

    CustomerDTO searchCustomer(String id);

    void deleteCustomer(String id);

}
