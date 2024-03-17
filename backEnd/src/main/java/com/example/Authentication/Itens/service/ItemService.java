package com.example.Authentication.Itens.service;

import com.example.Authentication.Itens.DTO.ItemDTO;
import com.example.Authentication.Itens.Interface.UnidadeMedidaInterface;
import com.example.Authentication.Itens.model.Item;
import com.example.Authentication.Itens.repository.ItemRepository;
import com.example.Authentication.UnidadeMedida.model.UnidadeMedida;
import com.example.Authentication.UnidadeMedida.repository.UnidadeMedidaRepository;
import com.example.Authentication.Utils.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Locale;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final UnidadeMedidaRepository unidadeMedidaRepository;
    private final MessageSource messageSource;
    Locale locale = new Locale("pt", "BR");

    public void cadastroIngrediente(ItemDTO itemDTO) {
        UnidadeMedida unidadeMedida = unidadeMedidaRepository.findById(itemDTO.getUnidadeMedida().getId()).orElseThrow(() ->
                new NotFoundException(messageSource.getMessage("error.isEmpty", null, locale)));
        if (Objects.isNull(itemDTO.getNome()) || itemDTO.getNome() == "") {
            throw new IllegalArgumentException(messageSource.getMessage("error.object.isEmpty", null, locale)
            );
        }
        Item itemRepositoryByNome = itemRepository.findByNome(itemDTO.getNome());
        if (Objects.nonNull(itemRepositoryByNome)) {
            throw new DuplicateKeyException(messageSource.getMessage("error.object.exist", null, locale));
        }
        Item item = new Item();

        item.setNome(itemDTO.getNome());
        item.setUnidadeMedida(unidadeMedida);
        item.setAtivo(0);
        item.setDataCadastro(new Date());
        item.setMultiplicador(itemDTO.getMultiplicador());

        itemRepository.save(item);

    }

    public void editar(ItemDTO itemDTO) {
        Item item = itemRepository.findById(itemDTO.getId()).orElseThrow(() ->
                new NotFoundException(messageSource.getMessage("error.isEmpty", null, locale)));
        if (Objects.nonNull(item)) {
            UnidadeMedida unidadeMedida = unidadeMedidaRepository.findById(itemDTO.getUnidadeMedida().getId()).orElseThrow(() ->
                    new NotFoundException(messageSource.getMessage("error.isEmpty", null, locale)));
            item.setUnidadeMedida(unidadeMedida);
            item.setNome(itemDTO.getNome());
            item.setValorVenda(itemDTO.getValorVenda());
            item.setSaldoEstoque(itemDTO.getSaldoEstoque());
            item.setMultiplicador(itemDTO.getMultiplicador());
            item.setAtivo(itemDTO.getAtivo());
            itemRepository.save(item);
        }
    }

    private void deleteById(ItemDTO itemDTO) {
        Item item = itemRepository.findById(itemDTO.getId()).orElseThrow(() ->
                new NotFoundException(messageSource.getMessage("error.isEmpty", null, locale)));
        if (Objects.nonNull(item)) {
            itemRepository.delete(item);
        }
    }

    public Double calculoQuantidade(UnidadeMedida unidadeMedida,Double multiplicador, Double quantidadeCompra) {
        Double valorQuantidade = null;
        switch (unidadeMedida.getNome()) {
            case UnidadeMedidaInterface.KG:
              Double valorTotal = UnidadeMedidaInterface.valorKG * quantidadeCompra;
              valorQuantidade = valorTotal / multiplicador;
                break;
            case UnidadeMedidaInterface.UN, UnidadeMedidaInterface.PC:
                valorQuantidade = multiplicador * quantidadeCompra ;
                break;
        }
        return valorQuantidade;
    }

}
