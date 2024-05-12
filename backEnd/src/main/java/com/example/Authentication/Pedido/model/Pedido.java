package com.example.Authentication.Pedido.model;

import com.example.Authentication.Caixa.model.Caixa;
import com.example.Authentication.FormaPagamento.model.FormaPagamento;
import com.example.Authentication.PedidoEspecialidade.model.PedidoEspecialidade;
import com.example.Authentication.PedidoMercadoria.model.PedidoMercadoria;
import com.example.Authentication.TipoPedido.DTO.TipoPedidoDTO;
import com.example.Authentication.TipoPedido.model.TipoPedido;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "pedido")
@AllArgsConstructor
@NoArgsConstructor
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(name = "nome_cliente")
    private String nomeCliente;
    @Column(name = "observacao", columnDefinition = "TEXT")
    private String observacao;
    private Integer mesa;
    @Column(name = "valor_total")
    private Double valorTotal;
    @ManyToOne
    @JoinColumn(name = "id_caixa", referencedColumnName = "id")
    private Caixa caixa;
    @OneToOne
    @JoinColumn(name = "id_forma_pagamento", referencedColumnName = "id")
    private FormaPagamento formaPagamento;
    @OneToMany(mappedBy = "pedido")
    private List<PedidoMercadoria> pedidoMercadoria;
    @OneToMany(mappedBy = "pedido")
    private List<PedidoEspecialidade> pedidoEspecialidades;
    @Column(name = "numeroPedido", columnDefinition = "TEXT")
    private String numeroPedido;
    private Integer pago;
    @OneToOne
    @JoinColumn(name = "id_tipo_pedido", referencedColumnName = "id")
    private TipoPedido tipoPedido;
}
