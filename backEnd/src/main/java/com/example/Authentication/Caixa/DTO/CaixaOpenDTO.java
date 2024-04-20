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
public class CaixaOpenDTO {

    private Double valorAberturaCaixa;

}
