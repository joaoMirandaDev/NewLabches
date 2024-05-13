package com.example.Authentication.PedidoEspecialidade.DTO;

import com.example.Authentication.AdicionalEspecialidade.DTO.AdicionalEspecialidadeDTO;
import com.example.Authentication.AdicionalEspecialidade.model.AdicionalEspecialidade;
import com.example.Authentication.Especialidade.DTO.EspecialidadeDTO;
import com.example.Authentication.Mercadoria.DTO.MercadoriaDTO;
import com.example.Authentication.Pedido.DTO.PedidoDTO;
import com.example.Authentication.PedidoEspecialidade.model.PedidoEspecialidade;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PedidoEspecialidadeDTO {

    private Integer id;
    private EspecialidadeDTO especialidade;
    private PedidoDTO pedido;
    private Integer quantidade;
    private Double valor;
    private List<AdicionalEspecialidadeDTO> adicionalEspecialidades;

    public PedidoEspecialidadeDTO(PedidoEspecialidade pedidoEspecialidade) {
        this.id = pedidoEspecialidade.getId();
        this.especialidade = new EspecialidadeDTO(pedidoEspecialidade.getEspecialidade());
        this.quantidade = pedidoEspecialidade.getQuantidade();
        this.adicionalEspecialidades = pedidoEspecialidade.getAdicionalEspecialidades().stream().
                map(AdicionalEspecialidadeDTO::new).collect(Collectors.toList());
    }
}
