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
import java.util.Objects;

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

    private void update(PedidoMercadoria pedidoMercadoria, PedidoMercadoriaDTO dto) {
        Mercadoria mercadoria = mercadoriaService.findById(dto.getMercadoria().getId());
        for (int i = 0; i <= pedidoMercadoria.getQuantidade(); i++) {
            mercadoriaService.aumentaSaldo(pedidoMercadoria.getMercadoria(), pedidoMercadoria.getQuantidade());
        }
        pedidoMercadoria.setQuantidade(dto.getQuantidade());
        for (int i = 0; i <= dto.getQuantidade(); i++) {
            mercadoriaService.reduzSaldo(mercadoria, dto.getQuantidade());
        }
        pedidoMercadoriaRepository.save(pedidoMercadoria);
    }

    public void createUpdateDelete(Pedido pedido, List<PedidoMercadoriaDTO> pedidoMercadoria) {
        // Verifica se a lista que vem do front e vazia, se for vazia e
        // tiver dados no banco ele deleta os dados do banco
        if (!pedido.getPedidoMercadoria().isEmpty() && pedidoMercadoria.isEmpty()) {
            pedido.getPedidoMercadoria().forEach(val -> this.delete(val));
        }
        // Verifica se a lista que vem do front não e vazia, se nao for vazia e não tiver
        // dados no banco ele cria os dados do banco
        if (!pedidoMercadoria.isEmpty() && pedido.getPedidoMercadoria().isEmpty()) {
            pedidoMercadoria.forEach(val -> this.create(val, pedido));
        }
        if (!pedido.getPedidoMercadoria().isEmpty() && !pedidoMercadoria.isEmpty()) {
            for ( PedidoMercadoria banco :  pedido.getPedidoMercadoria()) {
                boolean encontrado = false;
                for (PedidoMercadoriaDTO dto : pedidoMercadoria) {
                    if (Objects.isNull(dto.getId())) {
                        this.create(dto, pedido);
                    } else {
                        if (dto.getId().equals(banco.getId())) {
                            encontrado = true;
                            this.update(banco, dto);
                        }
                    }
                }
                if (!encontrado) {
                    this.delete(banco);
                }
            }
        }
    }


}
