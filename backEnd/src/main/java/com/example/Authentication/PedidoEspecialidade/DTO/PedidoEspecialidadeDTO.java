package com.example.Authentication.PedidoEspecialidade.DTO;

import com.example.Authentication.AdicionalEspecialidade.DTO.AdicionalEspecialidadeDTO;
import com.example.Authentication.AdicionalEspecialidade.model.AdicionalEspecialidade;
import com.example.Authentication.Especialidade.DTO.EspecialidadeDTO;
import com.example.Authentication.Mercadoria.DTO.MercadoriaDTO;
import com.example.Authentication.Pedido.DTO.PedidoDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PedidoEspecialidadeDTO {

    private Integer id;
    private EspecialidadeDTO especialidade;
    private PedidoDTO pedido;
    private Integer quantidade;
    private Double valorPedidoEspecialidade;
    private List<AdicionalEspecialidadeDTO> adicionalEspecialidades;
}
