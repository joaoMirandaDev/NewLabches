package com.example.Authentication.TipoPedido.controller;

import com.example.Authentication.Tipo.service.TipoService;
import com.example.Authentication.TipoPedido.DTO.TipoPedidoDTO;
import com.example.Authentication.TipoPedido.service.TipoPedidoService;
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
    public List<TipoPedidoDTO> findAll()  {
        return tipoService.getAll();
    }
}