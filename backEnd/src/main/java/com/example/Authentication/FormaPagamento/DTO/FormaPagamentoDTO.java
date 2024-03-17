package com.example.Authentication.FormaPagamento.DTO;

import com.example.Authentication.Fornecedores.model.Fornecedor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;


@AllArgsConstructor
@NoArgsConstructor
@Data

public class FormaPagamentoDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Short id;
    private String nome;
    private Integer ativo;
}
