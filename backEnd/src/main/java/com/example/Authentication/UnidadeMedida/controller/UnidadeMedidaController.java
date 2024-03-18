package com.example.Authentication.mercadoria.controller;

import com.example.Authentication.Colaborador.model.Colaborador;
import com.example.Authentication.Utils.filtro.Filtro;
import com.example.Authentication.mercadoria.DTO.MercadoriaDTO;
import com.example.Authentication.mercadoria.model.Mercadoria;
import com.example.Authentication.mercadoria.service.MercadoriaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mercadoria")
@Slf4j
public class MercadoriaController {

    private final MercadoriaService mercadoriaService;

    @PostMapping(value = "/adicionar", produces = "application/json")
    public void saveIngrediente(@RequestBody MercadoriaDTO ingrediente)  {
        mercadoriaService.cadastro(ingrediente);
    }

    @PostMapping(value = "/list", produces = "application/json")
    public Page<Mercadoria> findAllPessoa(@RequestBody Filtro filtro) {
        return mercadoriaService.findAllByPage(filtro);
    }
}

