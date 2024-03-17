package com.example.Authentication.Categoria.DTO;

import com.example.Authentication.Categoria.model.Categoria;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoriaDTO {

    private Integer id;
    private String nome;
    private Date dataCadastro;
    private Integer ativo;

    public CategoriaDTO(Categoria categoria) {
        this.id = categoria.getId();
        this.nome = categoria.getNome();
        this.dataCadastro = categoria.getData_cadastro();
        this.ativo = categoria.getAtivo();
    }
}
