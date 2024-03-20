package com.example.Authentication.UnidadeMedida.DTO;

import com.example.Authentication.UnidadeMedida.model.UnidadeMedida;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class UnidadeMedidaDTO {

    private Integer id;

    private String nome;

    private Integer ativo;

    public UnidadeMedidaDTO(UnidadeMedida unidadeMedida) {
        this.id = unidadeMedida.getId();
        this.nome = unidadeMedida.getNome();
    }
}
