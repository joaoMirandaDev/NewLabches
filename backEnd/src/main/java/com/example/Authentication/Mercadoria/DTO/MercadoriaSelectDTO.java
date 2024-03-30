package com.example.Authentication.Mercadoria.DTO;

import com.example.Authentication.Mercadoria.model.Mercadoria;
import com.example.Authentication.Tipo.DTO.TipoDTO;
import com.example.Authentication.Tipo.model.Tipo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class MercadoriaSelectDTO {

    private Integer id;
    private String nome;
    private TipoDTO tipo;
    public MercadoriaSelectDTO(Mercadoria mercadoria) {
        this.id = mercadoria.getId();
        this.nome = mercadoria.getNome();
        this.tipo = new TipoDTO(mercadoria.getTipo());
    }
}
