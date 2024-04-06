package com.example.Authentication.Caixa.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CaixaDTO {

    private Integer id;

    private Double valorAberturaCaixa;

    private Double valorFechamentoCaixa;

    private Date dataAbertura;

    private Date dataFechamento;

    private String observacao;

    private Integer ativo;

}
