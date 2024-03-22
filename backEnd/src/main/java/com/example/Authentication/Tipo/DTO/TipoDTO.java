package com.example.Authentication.Tipo.DTO;

import com.example.Authentication.Tipo.model.Tipo;
import com.example.Authentication.UnidadeMedida.DTO.UnidadeMedidaDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class TipoDTO {

    private Integer id;
    private String nome;
    private Integer ativo;

    public TipoDTO(Tipo tipo) {
        this.id = tipo.getId();
        this.nome = tipo.getNome();
    }
}
