package com.example.Authentication.Mercadoria.DTO;

import com.example.Authentication.Mercadoria.model.Mercadoria;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class MercadoriaSelectDTO {

    private Integer id;
    private String nome;
    public MercadoriaSelectDTO(Mercadoria mercadoria) {
        this.id = mercadoria.getId();
        this.nome = mercadoria.getNome();
    }
}
