package com.example.Authentication.saida.model;

import com.example.Authentication.Caixa.model.Caixa;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "saida")
public class Saida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "valor_saida")
    private Double valorSaida;

    private String observacao;

    @ManyToOne
    @JoinColumn(name = "id_caixa", referencedColumnName = "id")
    private Caixa caixa;

    private Integer ativo;
}
