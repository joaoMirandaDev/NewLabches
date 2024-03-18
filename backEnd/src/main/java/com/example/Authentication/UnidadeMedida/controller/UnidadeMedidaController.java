package com.example.Authentication.UnidadeMedida.controller;

import com.example.Authentication.UnidadeMedida.model.UnidadeMedida;
import com.example.Authentication.UnidadeMedida.service.UnidadeMedidaService;
import com.example.Authentication.Utils.filtro.Filtro;
import com.example.Authentication.mercadoria.DTO.MercadoriaDTO;
import com.example.Authentication.mercadoria.model.Mercadoria;
import com.example.Authentication.mercadoria.service.MercadoriaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
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

