package com.example.Authentication.Mercadoria.model;

import com.example.Authentication.Mercadoria.DTO.MercadoriaDTO;
import com.example.Authentication.Mercadoria.DTO.MercadoriaSelectDTO;
import com.example.Authentication.Tipo.model.Tipo;
import com.example.Authentication.UnidadeMedida.model.UnidadeMedida;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "mercadoria")
public class Mercadoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "nome", columnDefinition = "TEXT")
    private String nome;
    @OneToOne
    @JoinColumn(name = "id_unidade_medida", referencedColumnName = "id")
    private UnidadeMedida unidadeMedida;
    private Double valorVenda;
    private Double saldoEstoque;
    @Column(name = "porcao")
    private Double multiplicador;
    @Column(name = "data_cadastro")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", timezone="GMT-3")
    private Date dataCadastro;
    @Column(name = "limite_minimo")
    private Double limiteMinimo;
    private Integer ativo;
    @OneToOne
    @JoinColumn(name = "id_tipo", referencedColumnName = "id")
    private Tipo tipo;

    public Mercadoria(MercadoriaDTO mercadoriaDTO) {
        this.id = mercadoriaDTO.getId();
    }

    public Mercadoria(MercadoriaSelectDTO mercadoria) {
        this.id = mercadoria.getId();

    }
}
