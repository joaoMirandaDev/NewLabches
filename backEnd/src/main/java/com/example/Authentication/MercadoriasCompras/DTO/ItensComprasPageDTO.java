package com.example.Authentication.MercadoriasCompras.DTO;

import com.example.Authentication.Mercadoria.DTO.MercadoriaDTO;
import com.example.Authentication.MercadoriasCompras.model.ItensCompras;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ItensComprasPageDTO {

    private Integer id;
    private Double quantidade;
    private Date data;
    private Double valorCompra;
    private Double valorFinalUnitario;
    private Double quantidadeFinal;

    public ItensComprasPageDTO(ItensCompras itensCompras) {
        this.id = itensCompras.getId();
        this.quantidade = itensCompras.getQuantidade();
        this.data = itensCompras.getData();
        this.valorCompra = itensCompras.getValorCompra();
        this.valorFinalUnitario = itensCompras.getValorUnitario();
        this.quantidadeFinal = itensCompras.getQuantidadeFinal();
    }
}
