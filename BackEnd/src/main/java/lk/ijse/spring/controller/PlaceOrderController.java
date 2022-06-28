package lk.ijse.spring.controller;

import lk.ijse.spring.service.PlaceOrderService;
import lk.ijse.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("placeOrder")
@CrossOrigin
public class PlaceOrderController {

    @Autowired
    PlaceOrderService placeOrderService;



    @GetMapping("ids")
    public ResponseUtil getAllCustomerIds(){
        return new ResponseUtil(200,"OK",placeOrderService.getAllCustomerIds());
    }

    @GetMapping(path = "/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getCustomer(@PathVariable String id){
        return new ResponseUtil(200,"OK",placeOrderService.getCustomer(id));
    }




    @GetMapping("itemId")
    public ResponseUtil getAllItemIds(){
        return new ResponseUtil(200,"OK",placeOrderService.getAllItemIds());
    }


    @GetMapping(params = {"id"},produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getItem(@RequestParam String id){
        return new ResponseUtil(200,"OK",placeOrderService.getItem(id));
    }



}
