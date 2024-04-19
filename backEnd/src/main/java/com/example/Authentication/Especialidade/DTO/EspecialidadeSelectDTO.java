package com.example.Authentication.Especialidade.DTO;

import com.example.Authentication.Categoria.DTO.CategoriaDTO;
import com.example.Authentication.Especialidade.model.Especialidade;
import com.example.Authentication.EspecialidadeMercadoria.DTO.EspecialidadeMercadoriaDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EspecialidadeSelectDTO {

    private Integer id;

    private String nome;

    public EspecialidadeSelectDTO(Especialidade especialidade) {
        this.id = especialidade.getId();
        this.nome = especialidade.getNome();
    }
}
