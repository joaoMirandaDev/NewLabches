package com.example.Authentication.Mercadoria.DTO;

import com.example.Authentication.Mercadoria.model.Mercadoria;
import com.example.Authentication.UnidadeMedida.DTO.UnidadeMedidaDTO;
import com.example.Authentication.UnidadeMedida.model.UnidadeMedida;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class MercadoriaDTO {

    private Integer id;
    private String nome;
    private UnidadeMedidaDTO unidadeMedida;
    private Double valorCompra;
    private Double quantidade;
    private Double valorVenda;
    private Double saldoEstoque;
    private Double multiplicador;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", timezone="GMT-3")
    private Date dataCadastro;
    private Integer ativo;

    public MercadoriaDTO(Mercadoria mercadoria) {
        this.id = mercadoria.getId();
        this.nome = mercadoria.getNome();
    }
}
