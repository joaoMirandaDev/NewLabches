package com.example.Authentication.UnidadeMedida.controller;

import com.example.Authentication.UnidadeMedida.model.UnidadeMedida;
import com.example.Authentication.UnidadeMedida.service.UnidadeMedidaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/unidadeMedida")
@Slf4j
public class UnidadeMedidaController {

    private final UnidadeMedidaService unidadeMedidaService;
    @GetMapping(value = "/findAll", produces = "application/json")
    public List<UnidadeMedida> findAll()  {
      return unidadeMedidaService.findAll();
    }
}

