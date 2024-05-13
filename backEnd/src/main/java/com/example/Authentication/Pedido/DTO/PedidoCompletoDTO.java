package com.example.Authentication.Pedido.DTO;

import com.example.Authentication.Caixa.DTO.CaixaDTO;
import com.example.Authentication.FormaPagamento.DTO.FormaPagamentoDTO;
import com.example.Authentication.Pedido.model.Pedido;
import com.example.Authentication.PedidoEspecialidade.DTO.PedidoEspecialidadeDTO;
import com.example.Authentication.PedidoMercadoria.DTO.PedidoMercadoriaDTO;
import com.example.Authentication.TipoPedido.DTO.TipoPedidoDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PedidoCompletoDTO {
    private Integer id;
    private String nomeCliente;
    private String observacao;
    private Integer mesa;
    private Double valorTotal;
    private Integer ativo;
    private CaixaDTO caixa;
    private List<PedidoMercadoriaDTO> pedidoMercadoria;
    private FormaPagamentoDTO formaPagamento;
    private List<PedidoEspecialidadeDTO> pedidoEspecialidade;
    private TipoPedidoDTO tipoPedido;
    private String numeroPedido;
    private Integer pago;


    public PedidoCompletoDTO(Pedido pedido) {
        this.id = pedido.getId();
        this.nomeCliente = pedido.getNomeCliente();
        this.observacao = pedido.getObservacao();
        this.mesa = pedido.getMesa();
        this.valorTotal = pedido.getValorTotal();
        this.numeroPedido = pedido.getNumeroPedido();
        this.pago = pedido.getPago();
        this.tipoPedido = new TipoPedidoDTO(pedido.getTipoPedido());
        this.pedidoMercadoria = pedido.getPedidoMercadoria().stream().map(PedidoMercadoriaDTO::new).collect(Collectors.toList());
        this.pedidoEspecialidade = pedido.getPedidoEspecialidades().stream().
                map(PedidoEspecialidadeDTO::new).collect(Collectors.toList());
        this.formaPagamento = Objects.nonNull(pedido.getFormaPagamento()) ? new FormaPagamentoDTO(pedido.getFormaPagamento()) : null;
    }
}
