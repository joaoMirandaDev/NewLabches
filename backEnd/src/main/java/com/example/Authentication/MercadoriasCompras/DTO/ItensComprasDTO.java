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
public class ItensComprasDTO {

    private Integer id;
    private MercadoriaDTO mercadoriaDTO;
    private Double quantidade;
    private Date data;
    private Double valorCompra;

    public ItensComprasDTO(ItensCompras itensCompras) {
        this.id = itensCompras.getId();
        this.mercadoriaDTO = new MercadoriaDTO(itensCompras.getMercadoria());
        this.quantidade = itensCompras.getQuantidade();
        this.data = itensCompras.getData();
        this.valorCompra = itensCompras.getValorCompra();
    }
}
