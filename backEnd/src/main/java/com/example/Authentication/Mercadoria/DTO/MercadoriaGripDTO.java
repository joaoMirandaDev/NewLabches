package com.example.Authentication.Mercadoria.DTO;

import com.example.Authentication.Mercadoria.model.Mercadoria;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class MercadoriaGripDTO {

    private Integer id;
    private String nome;
    public MercadoriaGripDTO(Mercadoria mercadoria) {
        this.id = mercadoria.getId();
        this.nome = mercadoria.getNome();
    }
}
