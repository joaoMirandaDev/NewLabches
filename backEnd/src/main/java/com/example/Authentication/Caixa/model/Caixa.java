package com.example.Authentication.Caixa.model;

import com.example.Authentication.Pedido.model.Pedido;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "caixa")
public class Caixa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "valor_abertura_caixa")
    private Double valorAberturaCaixa;

    @Column(name = "valor_fechamento_caixa")
    private Double valorFechamentoCaixa;

    @Column(name = "data_abertura")
    private Date dataAbertura;

    @Column(name = "data_fechamento")
    private Date dataFechamento;

    private String observacao;

    private Integer ativo;

    @OneToMany(mappedBy = "caixa")
    private List<Pedido> pedidos;

}
