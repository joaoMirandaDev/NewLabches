package com.example.Authentication.Tipo.controller;

import com.example.Authentication.Mercadoria.DTO.MercadoriaDTO;
import com.example.Authentication.Mercadoria.DTO.MercadoriaGripDTO;
import com.example.Authentication.Mercadoria.model.Mercadoria;
import com.example.Authentication.Mercadoria.service.MercadoriaService;
import com.example.Authentication.Tipo.DTO.TipoDTO;
import com.example.Authentication.Tipo.service.TipoService;
import com.example.Authentication.Utils.filtro.Filtro;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tipo")
@Slf4j
public class TipoController {

    private final TipoService tipoService;

    @GetMapping(produces = "application/json")
    public List<TipoDTO> findAll()  {
        return tipoService.getAll();
    }
}

