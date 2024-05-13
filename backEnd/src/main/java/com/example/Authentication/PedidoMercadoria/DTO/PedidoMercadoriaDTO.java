package com.example.Authentication.PedidoMercadoria.DTO;

import com.example.Authentication.Mercadoria.DTO.MercadoriaDTO;
import com.example.Authentication.Mercadoria.model.Mercadoria;
import com.example.Authentication.Pedido.DTO.PedidoDTO;
import com.example.Authentication.Pedido.model.Pedido;
import com.example.Authentication.PedidoMercadoria.model.PedidoMercadoria;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PedidoMercadoriaDTO {

    private Integer id;
    private MercadoriaDTO mercadoria;
    private PedidoDTO pedido;
    private Integer quantidade;

    public PedidoMercadoriaDTO(PedidoMercadoria pedidoMercadoria) {
        this.id = pedidoMercadoria.getId();
        this.mercadoria = new MercadoriaDTO(pedidoMercadoria.getMercadoria());
        this.quantidade = pedidoMercadoria.getQuantidade();
    }
}
