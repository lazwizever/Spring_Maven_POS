package lk.ijse.spring.service;

import lk.ijse.spring.dto.ItemDTO;
import lk.ijse.spring.entity.Item;

import java.util.List;

public interface ItemService {
    void saveItem(ItemDTO itemDTO);

    List<ItemDTO> getAllItems();

    void updateItem(ItemDTO itemDTO);

    void deleteItem(String id);

    ItemDTO searchItem(String id);
}
