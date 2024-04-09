package com.example.Authentication.Pedido.DTO;

import com.example.Authentication.Caixa.DTO.CaixaDTO;
import com.example.Authentication.Caixa.model.Caixa;
import com.example.Authentication.Pedido.model.Pedido;
import com.example.Authentication.PedidoEspecialidade.DTO.PedidoEspecialidadeDTO;
import com.example.Authentication.PedidoMercadoria.DTO.PedidoMercadoriaDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PedidoDTO {
    private Integer id;
    private String nomeCliente;
    private String observacao;
    private Integer mesa;
    private Double valorTotal;
    private Integer ativo;
    private CaixaDTO caixa;
    private List<PedidoMercadoriaDTO> pedidoMercadoria;
    private List<PedidoEspecialidadeDTO> pedidoEspecialidade;

    public PedidoDTO(Pedido pedido) {
        this.id = pedido.getId();
        this.nomeCliente = pedido.getNomeCliente();
        this.observacao = pedido.getObservacao();
        this.mesa = pedido.getMesa();
        this.valorTotal = pedido.getValorTotal();
    }
}
