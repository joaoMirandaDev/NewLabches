package com.example.Authentication.PedidoEspecialidade.DTO;

import com.example.Authentication.Especialidade.DTO.EspecialidadeDTO;
import com.example.Authentication.Mercadoria.DTO.MercadoriaDTO;
import com.example.Authentication.Pedido.DTO.PedidoDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PedidoEspecialidadeDTO {

    private Integer id;
    private EspecialidadeDTO especialidade;
    private PedidoDTO pedido;
    private Integer quantidade;
}
