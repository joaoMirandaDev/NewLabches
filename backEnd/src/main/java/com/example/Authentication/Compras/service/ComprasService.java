package com.example.Authentication.Compras.service;

import com.example.Authentication.Compras.DTO.ComprasDto;
import com.example.Authentication.Compras.model.Compras;
import com.example.Authentication.Compras.repository.ComprasRepository;
import com.example.Authentication.FormaPagamento.model.FormaPagamento;
import com.example.Authentication.FormaPagamento.repository.FormaPagamentoRepository;
import com.example.Authentication.Fornecedores.model.Fornecedor;
import com.example.Authentication.Fornecedores.repository.FornecedorRepository;
import com.example.Authentication.mercadoria.repository.MercadoriaRepository;
import com.example.Authentication.ItensCompras.service.ItensComprasService;
import com.example.Authentication.Utils.Interfaces.LocaleInteface;
import com.example.Authentication.Utils.exceptions.NotFoundException;
import com.example.Authentication.Utils.filtro.Filtro;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ComprasService {
    private final ComprasRepository comprasRepository;
    private final FornecedorRepository fornecedorRepository;
    private final MercadoriaRepository mercadoriaRepository;
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

    public Page<ComprasDto> findAllProdutos(Filtro filtro) {
        Pageable pageable = createPageableFromFiltro(filtro);
        Page<Compras> comprasPage =  comprasRepository.findAll(pageable, filtro.getSearch());
        return comprasPage.map(ComprasDto::new);
    }

    private Pageable createPageableFromFiltro(Filtro filtro) {
        if (Objects.isNull(filtro.getId())) {
            filtro.setId("data_compra");
            filtro.setDesc(true);
        }
        if (Objects.nonNull(filtro.getId())) {
            switch (filtro.getId()) {
                case "data_compra":
                    filtro.setId("c.data_compra");
                    break;
                case "categoria.nome":
                    filtro.setId("c.nome");
                    break;
                case "dataCadastro":
                    filtro.setId("data_cadastro");
                    break;
                case "preco":
                    filtro.setId("preco");
                    break;
            }
        }
        Sort sort = filtro.isDesc() ? Sort.by(filtro.getId()).descending() : Sort.by(filtro.getId()).ascending();
        return PageRequest.of(filtro.getPagina(), filtro.getTamanhoPagina(), sort);
    }
}

