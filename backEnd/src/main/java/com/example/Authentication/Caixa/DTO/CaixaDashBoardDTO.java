package com.example.Authentication.Caixa.DTO;

import com.example.Authentication.Caixa.model.Caixa;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CaixaDashBoardDTO {
    private Integer id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", timezone="GMT-3")
    private Date dataAbertura;
    private Double valorFechamentoCaixa;
    private String numeroCaixa;

    public CaixaDashBoardDTO(Caixa caixa) {
        this.id = caixa.getId();
        this.dataAbertura = caixa.getDataAbertura();
        this.valorFechamentoCaixa = caixa.getValorFechamentoCaixa();
        this.numeroCaixa = caixa.getNumeroCaixa();
    }
}
