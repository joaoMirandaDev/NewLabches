package com.example.Authentication.Compras.service;

import com.example.Authentication.Compras.DTO.ComprasDto;
import com.example.Authentication.Compras.DTO.ComprasPageDto;
import com.example.Authentication.Compras.model.Compras;
import com.example.Authentication.Compras.repository.ComprasRepository;
import com.example.Authentication.FormaPagamento.model.FormaPagamento;
import com.example.Authentication.FormaPagamento.repository.FormaPagamentoRepository;
import com.example.Authentication.Fornecedores.model.Fornecedor;
import com.example.Authentication.Fornecedores.repository.FornecedorRepository;
import com.example.Authentication.Mercadoria.service.MercadoriaService;
import com.example.Authentication.MercadoriasCompras.service.ItensComprasService;
import com.example.Authentication.Utils.Interfaces.LocaleInteface;
import com.example.Authentication.Utils.exceptions.NotFoundException;
import com.example.Authentication.Utils.filtro.Filtro;
import com.example.Authentication.Utils.pagination.Pagination;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ComprasService implements Pagination {
    private final ComprasRepository comprasRepository;
    private final FornecedorRepository fornecedorRepository;
    private final FormaPagamentoRepository formaPagamentoRepository;
    private final MercadoriaService mercadoriaService;
    private static final Map<String, String> CAMPO_ORDENACAO = new HashMap<>();
    private final MessageSource messageSource;
    private final ItensComprasService itensComprasService;
    static {
        CAMPO_ORDENACAO.put("dataCompra", "data_compra");
        CAMPO_ORDENACAO.put("formaPagamento.nome", "fp.nome");
        CAMPO_ORDENACAO.put("fornecedor.nomeRazaoSocial", "f.nome_razao_social");
        CAMPO_ORDENACAO.put("valorTotalCompra", "valor_total_compra");
    }

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
            Double valorCompra = comprasDto.getItensCompras().stream().map(val -> val.getValorCompra())
                    .mapToDouble(Double::doubleValue).sum();
            compras.setValorTotalCompra(valorCompra);
            compras.setFormaPagamento(formaPagamento);
            compras.setFornecedor(fornecedor);
            compras.setDataCompra(new Date());
            boolean dataPagamentoValida = comprasDto.getDataPagamento() != null;
            compras.setDataPagamento(dataPagamentoValida ? comprasDto.getDataPagamento() : new Date());
            compras.setObservacao(comprasDto.getObservacao());

            if (formaPagamento.getNome() == "PRAZO" && comprasDto.getPago() != null) {
                compras.setPago(comprasDto.getPago());
            }
            compras.setAtivo(0);
            comprasRepository.save(compras);
            itensComprasService.saveListDto(comprasDto.getItensCompras(),compras);
        }

    }

    public void editar(ComprasDto comprasDto) {
        FormaPagamento formaPagamento = formaPagamentoRepository.findById(comprasDto.getFormaPagamento().getId())
                .orElseThrow(() -> new NotFoundException(
                        messageSource.getMessage("error.isEmpty", null, LocaleInteface.BR)
                ));
        Fornecedor fornecedor = fornecedorRepository.findById(comprasDto.getFornecedor().getId())
                .orElseThrow(() -> new NotFoundException(
                        messageSource.getMessage("error.isEmpty", null, LocaleInteface.BR)
                ));
        Compras compras = comprasRepository.findById(comprasDto.getId()).orElseThrow(() -> new NotFoundException(
                messageSource.getMessage("error.isEmpty", null, LocaleInteface.BR)
        ));
        compras.setDataCompra(comprasDto.getDataCompra());
        compras.setDataPagamento(comprasDto.getDataPagamento());
        compras.setFormaPagamento(formaPagamento);
        compras.setFornecedor(fornecedor);
        compras.setObservacao(comprasDto.getObservacao());
        Double valorCompra = comprasDto.getItensCompras().stream().map(val -> val.getValorCompra())
                .mapToDouble(Double::doubleValue).sum();
        compras.setValorTotalCompra(valorCompra);
        comprasRepository.save(compras);
        itensComprasService.saveAndEdit(comprasDto.getItensCompras(),compras);
    }

    public void deleteById(Integer id) {
        if (Objects.nonNull(id)) {
           Compras compras =  comprasRepository.findById(id).orElseThrow(() -> new NotFoundException(
                    messageSource.getMessage("error.isEmpty", null, LocaleInteface.BR)));
            mercadoriaService.revertValues(compras.getIngredientesList());
            comprasRepository.delete(compras);
        }
    }

    @Override
    public Pageable createPageableFromFiltro(Filtro filtro, Map<String, String> CAMPO_MAP, String OrderInitial) {
        return Pagination.super.createPageableFromFiltro(filtro, CAMPO_MAP, OrderInitial);
    }

    public Page<ComprasPageDto> findAllByPage(Filtro filtro) {
        Pageable pageable = this.createPageableFromFiltro(filtro, CAMPO_ORDENACAO, "data_compra");
        Page<Compras> comprasPage =  comprasRepository.findAll(pageable, filtro.getSearch());
        return comprasPage.map(ComprasPageDto::new);
    }

    public ComprasDto findById(Integer id) {
        Compras compras = comprasRepository.findById(id).orElseThrow(() -> new NotFoundException(
                messageSource.getMessage("error.isEmpty", null, LocaleInteface.BR)));
        return new ComprasDto(compras);
    }

}

