package com.example.Authentication.PedidoEspecialidade.service;

import com.example.Authentication.AdicionalEspecialidade.model.AdicionalEspecialidade;
import com.example.Authentication.AdicionalEspecialidade.service.AdicionalEspecialidadeService;
import com.example.Authentication.Especialidade.model.Especialidade;
import com.example.Authentication.Especialidade.service.EspecialidadeService;
import com.example.Authentication.Mercadoria.repository.MercadoriaRepository;
import com.example.Authentication.Mercadoria.service.MercadoriaService;
import com.example.Authentication.Pedido.model.Pedido;
import com.example.Authentication.PedidoEspecialidade.DTO.PedidoEspecialidadeDTO;
import com.example.Authentication.PedidoEspecialidade.model.PedidoEspecialidade;
import com.example.Authentication.PedidoEspecialidade.repository.PedidoEspecialidadeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PedidoEspecialidadeService {
    private final PedidoEspecialidadeRepository pedidoEspecialidadeRepository;
    private final MercadoriaService mercadoriaService;
    private final EspecialidadeService especialidadeService;
    private final AdicionalEspecialidadeService adicionalEspecialidadeService;

    private void create(PedidoEspecialidadeDTO val, Pedido pedido) {
        Especialidade especialidade = especialidadeService.findById(val.getEspecialidade().getId());
        PedidoEspecialidade pedidoEspecialidade = new PedidoEspecialidade();
        pedidoEspecialidade.setEspecialidade(especialidade);
        pedidoEspecialidade.setPedido(pedido);
        pedidoEspecialidade.setQuantidade(val.getQuantidade());
        pedidoEspecialidade.setValorPedidoEspecialidade(val.getValorPedidoEspecialidade());
        pedidoEspecialidadeRepository.save(pedidoEspecialidade);
        if (val.getAdicionalEspecialidades().size() > 0) {
            adicionalEspecialidadeService.createList(pedidoEspecialidade, val.getAdicionalEspecialidades());
        }
    }
    public void createList(List<PedidoEspecialidadeDTO> pedidoEspecialidade, Pedido pedido) {
        pedidoEspecialidade.forEach(val -> {
            this.create(val, pedido);
        });
    }


}
