package com.example.Authentication.MercadoriasCompras.DTO;

import com.example.Authentication.Mercadoria.DTO.MercadoriaDTO;
import com.example.Authentication.MercadoriasCompras.model.ItensCompras;
import com.example.Authentication.UnidadeMedida.DTO.UnidadeMedidaDTO;
import com.example.Authentication.UnidadeMedida.model.UnidadeMedida;
import com.fasterxml.jackson.annotation.JsonFormat;
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
    private UnidadeMedidaDTO unidadeMedida;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", timezone="GMT-3")
    private Date data;
    private Double valorCompra;
    private Double valorFinalUnitario;
    private Double quantidadeFinal;

    public ItensComprasPageDTO(ItensCompras itensCompras) {
        this.id = itensCompras.getId();
        this.quantidade = itensCompras.getQuantidade();
        this.data = itensCompras.getData();
        this.valorCompra = itensCompras.getValorCompra();
        this.unidadeMedida = new UnidadeMedidaDTO(itensCompras.getMercadoria().getUnidadeMedida());
        this.valorFinalUnitario = itensCompras.getValorUnitario();
        this.quantidadeFinal = itensCompras.getQuantidadeFinal();
    }
}
