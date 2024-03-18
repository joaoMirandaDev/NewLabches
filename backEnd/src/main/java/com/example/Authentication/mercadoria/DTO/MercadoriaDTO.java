package com.example.Authentication.Itens.DTO;

import com.example.Authentication.UnidadeMedida.model.UnidadeMedida;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class ItemDTO {

    private Integer id;
    private String nome;
    private UnidadeMedida unidadeMedida;
    private Double valorCompra;
    private Double quantidade;
    private Double valorVenda;
    private Double saldoEstoque;
    private Double multiplicador;
    private Date dataCadastro;
    private Integer ativo;

}
