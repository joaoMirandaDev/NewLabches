package com.example.Authentication.Pedido.model;

import com.example.Authentication.Caixa.model.Caixa;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "pedido")
@AllArgsConstructor
@NoArgsConstructor
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "nome_cliente")
    private String nomeCliente;
    private String observacao;
    private Integer mesa;
    @Column(name = "valor_total")
    private Double valorTotal;
    private Integer ativo;
    @ManyToOne
    @JoinColumn(name = "id_caixa", referencedColumnName = "id")
    private Caixa caixa;

}
