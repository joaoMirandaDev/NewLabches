package com.example.Authentication.Compras.service;

import com.example.Authentication.Compras.DTO.ComprasDto;
import com.example.Authentication.Compras.model.Compras;
import com.example.Authentication.Compras.repository.ComprasRepository;
import com.example.Authentication.FormaPagamento.model.FormaPagamento;
import com.example.Authentication.FormaPagamento.repository.FormaPagamentoRepository;
import com.example.Authentication.Fornecedores.model.Fornecedor;
import com.example.Authentication.Fornecedores.repository.FornecedorRepository;
import com.example.Authentication.Itens.repository.ItemRepository;
import com.example.Authentication.ItensCompras.service.ItensComprasService;
import com.example.Authentication.Utils.Interfaces.LocaleInteface;
import com.example.Authentication.Utils.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ComprasService {
    private final ComprasRepository comprasRepository;
    private final FornecedorRepository fornecedorRepository;
    private final ItemRepository itemRepository;
    private final FormaPagamentoRepository formaPagamentoRepository;
    private final MessageSource messageSource;
    private final ItensComprasService itensComprasService;

    public void addCompras(ComprasDto comprasDto) {
        Compras compras = new Compras();
        FormaPagamento formaPagamento = formaPagamentoRepository.findById(comprasDto.getFormaPagamento().getId())
                .orElseThrow(() -> new NotFoundException(
                messageSource.getMessage("error.isEmpty", null, LocaleInteface.BR)
        ));
        Fornecedor fornecedor = fornecedorRepository.findById(comprasDto.getFornecedor().getId())
                .orElseThrow(() -> new NotFoundException(
                messageSource.getMessage("error.isEmpty", null, LocaleInteface.BR)
        ));
        if (Objects.nonNull(comprasDto)) {
            compras.setDataCompra(new Date());
            compras.setFormaPagamento(formaPagamento);
            compras.setFornecedor(fornecedor);
            compras.setDataCompra(new Date());
            boolean dataPagamentoValida = comprasDto.getDataPagamento() != null;
            compras.setDataPagamento(dataPagamentoValida ? comprasDto.getDataPagamento() : new Date());
            compras.setObservacao(comprasDto.getObservacao());
            if (compras.getPago() == 0 || compras.getPago() == null) {
                compras.setPago(0);
            }
            if (formaPagamento.getNome() == "PRAZO" && comprasDto.getPago() != null) {
                compras.setPago(comprasDto.getPago());
            }
            compras.setAtivo(0);
            compras.setValorTotalCompra(comprasDto.getValorTotalCompra());
            comprasRepository.save(compras);
            itensComprasService.saveListDto(comprasDto.getItensComprasDTOS(),compras);
        }

    }

    public void deleteById(Integer id) {
        if (Objects.nonNull(id)) {
           Compras compras =  comprasRepository.findById(id).orElseThrow(() -> new NotFoundException(
                    messageSource.getMessage("error.isEmpty", null, LocaleInteface.BR)));
            comprasRepository.delete(compras);
        }
    }
}

