package com.example.Authentication.ItensCompras.service;

import com.example.Authentication.Compras.model.Compras;
import com.example.Authentication.Itens.model.Item;
import com.example.Authentication.Itens.repository.ItemRepository;
import com.example.Authentication.Itens.service.ItemService;
import com.example.Authentication.ItensCompras.DTO.ItensComprasDTO;
import com.example.Authentication.ItensCompras.model.ItensCompras;
import com.example.Authentication.ItensCompras.repository.ItensCompraRepository;
import com.example.Authentication.Utils.Interfaces.LocaleInteface;
import com.example.Authentication.Utils.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ItensComprasService {

    private final MessageSource messageSource;

    private final ItemRepository itemRepository;
    private final ItemService itemService;
    private final ItensCompraRepository itensCompraRepository;


    public void saveListDto(List<ItensComprasDTO> itensComprasDTOS, Compras compras) {
        for (ItensComprasDTO itensComprasDTO : itensComprasDTOS) {
            ItensCompras itensCompras = new ItensCompras();
            Item item = itemRepository.
                    findById(itensComprasDTO.getItemDTO().getId()).orElseThrow(()
                            -> new NotFoundException(
                            messageSource.getMessage("error.isEmpty", null, LocaleInteface.BR)
                    ));
            if (Objects.isNull(item.getSaldoEstoque())) {
                item.setSaldoEstoque(0.0);
            }
            item.setSaldoEstoque(item.getSaldoEstoque() + itemService.
                    calculoQuantidade(item.getUnidadeMedida(),
                    item.getMultiplicador(), itensComprasDTO.getQuantidade()));
            itensCompras.setItem(item);
            itensCompras.setCompras(compras);
            itensCompras.setQuantidade(itensComprasDTO.getQuantidade());
            itensCompras.setQuantidadeFinal(itemService.
                    calculoQuantidade(item.getUnidadeMedida(),
                            item.getMultiplicador(), itensComprasDTO.getQuantidade()));
            itensCompras.setValorCompra(itensComprasDTO.getValorCompra());
            itensCompras.setValorUnitario((itensCompras.getValorCompra() * itensCompras.getQuantidade()) / itensCompras.getQuantidadeFinal());
            itensCompras.setData(new Date());
            itemRepository.save(item);
            itensCompraRepository.save(itensCompras);

        }
    }

}
