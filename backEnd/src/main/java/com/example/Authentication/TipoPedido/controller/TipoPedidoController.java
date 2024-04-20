package com.example.Authentication.TipoPedido.controller;

import com.example.Authentication.Tipo.service.TipoService;
import com.example.Authentication.TipoPedido.DTO.TipoPedidoDTO;
import com.example.Authentication.TipoPedido.service.TipoPedidoService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tipoPedido")
@Slf4j
public class TipoPedidoController {

    private final TipoPedidoService tipoService;

    @GetMapping(produces = "application/json")
    @Operation(summary = "Listar os tipos de pedido", description = "Metodo utilizado para listar os tipos de pedido", tags = "Tipo Pedido")
    public List<TipoPedidoDTO> findAll()  {
        return tipoService.getAll();
    }
}