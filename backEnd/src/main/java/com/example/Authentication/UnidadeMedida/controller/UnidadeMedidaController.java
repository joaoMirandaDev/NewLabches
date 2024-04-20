package com.example.Authentication.UnidadeMedida.controller;

import com.example.Authentication.UnidadeMedida.model.UnidadeMedida;
import com.example.Authentication.UnidadeMedida.service.UnidadeMedidaService;
import io.swagger.v3.oas.annotations.Operation;
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
    @Operation(summary = "Listar as unidades de medida", description = "Metodo utilizado para listar as unidades de medida", tags = "Unidade de Medida")
    public List<UnidadeMedida> findAll()  {
      return unidadeMedidaService.findAll();
    }
}

