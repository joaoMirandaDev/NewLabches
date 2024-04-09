package com.example.Authentication.Pedido.controller;

import com.example.Authentication.Compras.DTO.ComprasDto;
import com.example.Authentication.Pedido.DTO.PedidoDTO;
import com.example.Authentication.Pedido.service.PedidoService;
import com.example.Authentication.Utils.filtro.Filtro;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/pedido")
@Slf4j
public class PedidoController {

    private final PedidoService pedidoService;

    @PostMapping(value = "/list/{id}", produces = "application/json")
    public Page<PedidoDTO> findAllPageByIdCaixa(@PathVariable Integer id, @RequestBody Filtro filtro) {
     return pedidoService.findAllPageByIdCaixa(id, filtro);
    }

    @PostMapping(value = "/addPedido/{id}", produces = "application/json")
    public void addCompra(@RequestBody PedidoDTO pedidoDTO, @PathVariable Integer id) {
        pedidoService.addPedido(pedidoDTO, id);
    }
}
