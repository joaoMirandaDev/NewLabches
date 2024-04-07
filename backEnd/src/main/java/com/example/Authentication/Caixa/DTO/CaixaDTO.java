package com.example.Authentication.Caixa.DTO;

import com.example.Authentication.Caixa.model.Caixa;
import com.fasterxml.jackson.annotation.JsonFormat;
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

    private String numeroCaixa;

    private Integer caixaAberto;

    private Double valorAberturaCaixa;

    private Double valorFechamentoCaixa;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", timezone="GMT-3")
    private Date dataAbertura;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", timezone="GMT-3")
    private Date dataFechamento;

    private String observacao;

    private Integer ativo;

    public CaixaDTO(Caixa caixa) {
        this.id = caixa.getId();
        this.numeroCaixa = caixa.getNumeroCaixa();
        this.dataAbertura = caixa.getDataAbertura();
        this.valorAberturaCaixa = caixa.getValorAberturaCaixa();
        this.dataFechamento = caixa.getDataFechamento();
        this.valorFechamentoCaixa = caixa.getValorFechamentoCaixa();
        this.caixaAberto = caixa.getCaixaAberto();
    }
}
