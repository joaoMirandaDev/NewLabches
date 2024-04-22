package com.example.Authentication.FormaPagamento.DTO;

import com.example.Authentication.FormaPagamento.model.FormaPagamento;
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

    private Integer id;
    private String nome;
    private Integer ativo;

    public FormaPagamentoDTO(FormaPagamento formaPagamento) {
        this.id = formaPagamento.getId();
        this.nome = formaPagamento.getNome();
        this.ativo = formaPagamento.getAtivo();
    }
}
