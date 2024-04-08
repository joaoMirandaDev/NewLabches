package com.example.Authentication.Pedido.service;

import com.example.Authentication.Caixa.DTO.CaixaDTO;
import com.example.Authentication.Compras.DTO.ComprasDto;
import com.example.Authentication.Pedido.DTO.PedidoDTO;
import com.example.Authentication.Pedido.model.Pedido;
import com.example.Authentication.Pedido.repository.PedidoRepository;
import com.example.Authentication.Utils.filtro.Filtro;
import com.example.Authentication.Utils.pagination.Pagination;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PedidoService implements Pagination {

    private static final Map<String, String> CAMPO_ORDENACAO = new HashMap<>();
    private final PedidoRepository pedidoRepository;
    static {
        CAMPO_ORDENACAO.put("nomeCliente", "nome_cliente");
        CAMPO_ORDENACAO.put("mesa", "mesa");
        CAMPO_ORDENACAO.put("numeroPedido", "numero_pedido");
        CAMPO_ORDENACAO.put("formaPagamento", "id_forma_pagamento");
        CAMPO_ORDENACAO.put("valorTotal", "valor_total");
    }

    @Override
    public Pageable createPageableFromFiltro(Filtro filtro, Map<String, String> CAMPO_MAP, String OrderInitial) {
        return Pagination.super.createPageableFromFiltro(filtro, CAMPO_MAP, OrderInitial);
    }

    public Page<PedidoDTO> findAllPageByIdCaixa(Integer id, Filtro filtro) {
        Pageable pageable = this.createPageableFromFiltro(filtro, CAMPO_ORDENACAO, "numero_pedido");
        Page<Pedido> pedidos = pedidoRepository.findAll(pageable ,id, filtro.getSearch());
        return pedidos.map(PedidoDTO::new);
    }

    public void addPedido(ComprasDto comprasDto) {
    }
}
