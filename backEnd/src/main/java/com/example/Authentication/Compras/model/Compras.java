package com.example.Authentication.Compras.model;

import com.example.Authentication.FormaPagamento.model.FormaPagamento;
import com.example.Authentication.Fornecedores.model.Fornecedor;
import com.example.Authentication.MercadoriasCompras.model.ItensCompras;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "compras")
public class  Compras {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @OneToOne
    @JoinColumn(name = "id_forma_pagamento", referencedColumnName = "id")
    private FormaPagamento formaPagamento;
    @OneToOne
    @JoinColumn(name = "id_fornecedor", referencedColumnName = "id")
    private Fornecedor fornecedor;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", timezone="GMT-3")
    @Column(name = "data_compra")
    private Date dataCompra;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", timezone="GMT-3")
    @Column(name = "data_pagamento")
    private Date dataPagamento;
    @Column(name = "observacao", columnDefinition = "TEXT")
    private String observacao;
    @Column(name = "valor_total_compra")
    private Double valorTotalCompra;
    @Column(name = "pagamento_compra")
    private Integer pago;
    private Integer ativo;
    @OneToMany(mappedBy = "compras", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItensCompras> ingredientesList;

}
