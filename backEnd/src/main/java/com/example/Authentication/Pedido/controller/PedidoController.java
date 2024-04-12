package com.example.Authentication.Pedido.controller;

import com.example.Authentication.Pedido.DTO.PedidoDTO;
import com.example.Authentication.Pedido.service.PedidoService;
import com.example.Authentication.Utils.Interfaces.LocaleInteface;
import com.example.Authentication.Utils.filtro.Filtro;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/pedido")
@Slf4j
public class PedidoController {

    private final MessageSource messageSource;
    private final PedidoService pedidoService;

    @PostMapping(value = "/list/{id}", produces = "application/json")
    public Page<PedidoDTO> findAllPageByIdCaixa(@PathVariable Integer id, @RequestBody Filtro filtro) {
     return pedidoService.findAllPageByIdCaixa(id, filtro);
    }

    @PostMapping(value = "/addPedido/{id}", produces = "application/json")
    public ResponseEntity<String> addCompra(@RequestBody PedidoDTO pedidoDTO, @PathVariable Integer id) {
        pedidoService.addPedido(pedidoDTO, id);
        return ResponseEntity.status(HttpStatus.CREATED).body(messageSource.getMessage("success.created",
                null, LocaleInteface.BR));
    }

    @GetMapping(value = "/getValorTotal/{id}", produces = "application/json")
    public Double getValorTotal(@PathVariable Integer id) {
      return pedidoService.getValorTotalByCaixa(id);
    }
}
