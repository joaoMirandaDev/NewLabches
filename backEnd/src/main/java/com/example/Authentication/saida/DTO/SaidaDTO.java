package com.example.Authentication.saida.DTO;

import com.example.Authentication.Caixa.DTO.CaixaDTO;
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
public class SaidaDTO {

    private Integer id;

    private Double valorSaida;

    private String observacao;

    private CaixaDTO caixa;

    private Integer ativo;
}
