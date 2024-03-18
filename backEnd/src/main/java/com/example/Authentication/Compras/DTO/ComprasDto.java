package com.example.Authentication.Compras.DTO;

import com.example.Authentication.Compras.model.Compras;
import com.example.Authentication.FormaPagamento.DTO.FormaPagamentoDTO;
import com.example.Authentication.Fornecedores.DTO.FornecedorDto;
import com.example.Authentication.ItensCompras.DTO.ItensComprasDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class ComprasDto {

    private Short id;
    private FormaPagamentoDTO formaPagamento;
    private FornecedorDto fornecedor;
    private Date dataCompra;
    private Date dataPagamento;
    private String observacao;
    private Double valorTotalCompra;
    private Integer pago;
    private Integer ativo;
    private List<ItensComprasDTO> itensComprasDTOS;

    public ComprasDto(Compras compras) {
        this.id = compras.getId();
        this.formaPagamento = new FormaPagamentoDTO(compras.getFormaPagamento());
        this.fornecedor = new FornecedorDto(compras.getFornecedor());
        this.dataCompra = compras.getDataCompra();
        this.dataPagamento = compras.getDataPagamento();
        this.valorTotalCompra = compras.getValorTotalCompra();
    }
}
