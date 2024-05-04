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
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PedidoEspecialidadeService {
    private final PedidoEspecialidadeRepository pedidoEspecialidadeRepository;
    private final MercadoriaService mercadoriaService;
    private final EspecialidadeService especialidadeService;
    private final AdicionalEspecialidadeService adicionalEspecialidadeService;

    public void create(PedidoEspecialidadeDTO val, Pedido pedido) {
        PedidoEspecialidade pedidoEspecialidade = new PedidoEspecialidade();
        pedidoEspecialidade.setEspecialidade(especialidadeService.findById(val.getEspecialidade().getId()));
        pedidoEspecialidade.setPedido(pedido);
        pedidoEspecialidade.setQuantidade(val.getQuantidade());
        pedidoEspecialidade.setValorPedidoEspecialidade(val.getValorPedidoEspecialidade());
        pedidoEspecialidadeRepository.save(pedidoEspecialidade);
        if (Objects.nonNull(val.getAdicionalEspecialidades()) && !val.getAdicionalEspecialidades().isEmpty()) {
            val.getAdicionalEspecialidades().forEach(obj -> {
                adicionalEspecialidadeService.create(pedidoEspecialidade, obj);
            });
        }
        val.getEspecialidade().getEspecialidadeMercadoria().forEach(obj -> {
            mercadoriaService.reduzSaldo(mercadoriaService.findById(obj.getMercadoria().getId()), obj.getQuantidade());
        });
    }
}
