package com.example.Authentication.PedidoMercadoria.service;

import com.example.Authentication.Mercadoria.model.Mercadoria;
import com.example.Authentication.Mercadoria.service.MercadoriaService;
import com.example.Authentication.Pedido.model.Pedido;
import com.example.Authentication.PedidoEspecialidade.model.PedidoEspecialidade;
import com.example.Authentication.PedidoMercadoria.DTO.PedidoMercadoriaDTO;
import com.example.Authentication.PedidoMercadoria.model.PedidoMercadoria;
import com.example.Authentication.PedidoMercadoria.repository.PedidoMercadoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PedidoMercadoriaService {

    private final PedidoMercadoriaRepository pedidoMercadoriaRepository;
    private final MercadoriaService mercadoriaService;

    public void create(PedidoMercadoriaDTO pedidoMercadoria, Pedido pedido) {
        Mercadoria mercadoria = mercadoriaService.findById(pedidoMercadoria.getMercadoria().getId());
        PedidoMercadoria newPedidoMercadoria = new PedidoMercadoria();
        newPedidoMercadoria.setPedido(pedido);
        newPedidoMercadoria.setMercadoria(mercadoria);
        newPedidoMercadoria.setQuantidade(pedidoMercadoria.getQuantidade());
        mercadoriaService.reduzSaldo(mercadoria, pedidoMercadoria.getQuantidade());
        pedidoMercadoriaRepository.save(newPedidoMercadoria);
    }

    public void delete(PedidoMercadoria val) {
        mercadoriaService.aumentaSaldo(val.getMercadoria(),val.getQuantidade());
        pedidoMercadoriaRepository.delete(val);
    }

    public void createUpdateDelte(Pedido pedido, List<PedidoMercadoriaDTO> pedidoMercadoria) {
    }
}
