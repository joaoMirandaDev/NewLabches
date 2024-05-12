package com.example.Authentication.Caixa.model;

import com.example.Authentication.Pedido.model.Pedido;
import com.example.Authentication.saida.model.Saida;
import com.fasterxml.jackson.annotation.JsonFormat;
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
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "numero_caixa", columnDefinition = "TEXT")
    private String numeroCaixa;

    @Column(name = "valor_abertura_caixa")
    private Double valorAberturaCaixa;

    @Column(name = "valor_fechamento_caixa")
    private Double valorFechamentoCaixa;

    @Column(name = "data_abertura")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", timezone="GMT-3")
    private Date dataAbertura;

    @Column(name = "data_fechamento")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", timezone="GMT-3")
    private Date dataFechamento;

    @Column(name = "observacao", columnDefinition = "TEXT")
    private String observacao;

    private Integer ativo;

    @Column(name = "caixa_aberto")
    private Integer caixaAberto;

    @OneToMany(mappedBy = "caixa")
    private List<Pedido> pedidos;

    @OneToMany(mappedBy = "caixa")
    private List<Saida> saida;
}
