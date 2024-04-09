package com.example.Authentication.AdicionalEspecialidade.DTO;

import com.example.Authentication.Mercadoria.model.Mercadoria;
import com.example.Authentication.PedidoEspecialidade.model.PedidoEspecialidade;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdicionalEspecialidadeDTO {

    private Integer id;
    private Mercadoria mercadoria;
    private PedidoEspecialidade pedidoEspecialidade;
    private Integer quantidade;
}
