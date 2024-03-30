package com.example.Authentication.Compras.DTO;

import com.example.Authentication.Compras.model.Compras;
import com.example.Authentication.FormaPagamento.DTO.FormaPagamentoDTO;
import com.example.Authentication.Fornecedores.DTO.FornecedorByCompraDto;
import com.example.Authentication.Fornecedores.DTO.FornecedorDto;
import com.example.Authentication.MercadoriasCompras.DTO.ItensComprasDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class ComprasPageDto {

    private Integer id;
    private FormaPagamentoDTO formaPagamento;
    private FornecedorByCompraDto fornecedor;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", timezone="GMT-3")
    private Date dataCompra;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", timezone="GMT-3")
    private Date dataPagamento;
    private Double valorTotalCompra;
    private Integer pago;

    public ComprasPageDto(Compras compras) {
        this.id = compras.getId();
        this.formaPagamento = new FormaPagamentoDTO(compras.getFormaPagamento());
        this.fornecedor = new FornecedorByCompraDto(compras.getFornecedor());
        this.valorTotalCompra = compras.getValorTotalCompra();
        this.dataCompra = compras.getDataCompra();
        this.dataPagamento = compras.getDataPagamento();
        this.pago = compras.getPago();
    }
}
