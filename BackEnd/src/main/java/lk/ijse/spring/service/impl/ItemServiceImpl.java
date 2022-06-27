package lk.ijse.spring.service.impl;

import lk.ijse.spring.dto.CustomerDTO;
import lk.ijse.spring.dto.ItemDTO;
import lk.ijse.spring.entity.Item;
import lk.ijse.spring.repo.ItemRepo;
import lk.ijse.spring.service.ItemService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ItemServiceImpl implements ItemService {

    @Autowired
    ItemRepo itemRepo;

    @Autowired
    ModelMapper mapper;

    @Override
    public void saveItem(ItemDTO itemDTO) {
        if (!itemRepo.existsById(itemDTO.getItemId())){
            itemRepo.save(mapper.map(itemDTO,Item.class));
        }else {
            throw new RuntimeException("Item already exist");
        }
    }

    @Override
    public List<ItemDTO> getAllItems() {
        return mapper.map(itemRepo.findAll(),new TypeToken<List<ItemDTO>>() {}.getType());
    }

    @Override
    public void updateItem(ItemDTO itemDTO) {
        if (itemRepo.existsById(itemDTO.getItemId())){
            itemRepo.save(mapper.map(itemDTO,Item.class));
        }else {
            throw new RuntimeException("No Such Item To Update..! Please Check the ID..!");
        }
    }

    @Override
    public void deleteItem(String id) {
        if (itemRepo.existsById(id)){
            itemRepo.deleteById(id);
        }else {
            throw new RuntimeException("No item for "+id+"..!");
        }
    }

    @Override
    public ItemDTO searchItem(String id) {
        if (itemRepo.existsById(id)){
            return mapper.map(itemRepo.findById(id).get(),ItemDTO.class);
        }else {
            throw new RuntimeException("No item for "+id+"..!");
        }
    }
}
