package com.example.Authentication.Itens.model;

import com.example.Authentication.UnidadeMedida.model.UnidadeMedida;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "ingrediente")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nome;
    @OneToOne
    @JoinColumn(name = "id_unidade_medida", referencedColumnName = "id")
    private UnidadeMedida unidadeMedida;
    private Double valorVenda;
    private Double saldoEstoque;
    @Column(name = "porcao")
    private Double multiplicador;
    @Column(name = "data_cadastro")
    private Date dataCadastro;
    private Integer ativo;

}
