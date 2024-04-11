package com.example.Authentication.TipoPedido.DTO;

import com.example.Authentication.TipoPedido.model.TipoPedido;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class TipoPedidoDTO {

    private Integer id;
    private String name;
    private Integer ativo;

    public TipoPedidoDTO(TipoPedido tipo) {
        this.id = tipo.getId();
        this.name = tipo.getName();
    }
}
