package com.example.Authentication.Tipo.controller;

import com.example.Authentication.Tipo.DTO.TipoDTO;
import com.example.Authentication.Tipo.service.TipoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

