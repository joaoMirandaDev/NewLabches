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

    @PutMapping(value = "/editar", produces = "application/json")
    public void editIngrediente(@RequestBody MercadoriaDTO ingrediente)  {
        mercadoriaService.editar(ingrediente);
    }

    @GetMapping(value = "/findById/{id}", produces = "application/json")
    public Mercadoria saveIngrediente(@PathVariable Integer id)  {
        return mercadoriaService.findById(id);
    }

    @DeleteMapping(value = "/deleteById/{id}", produces = "application/json")
    public void deleteById(@PathVariable Integer id)  {
        mercadoriaService.deleteById(id);
    }

    @PostMapping(value = "/list", produces = "application/json")
    public Page<Mercadoria> findAllPessoa(@RequestBody Filtro filtro) {
        return mercadoriaService.findAllByPage(filtro);
    }
}

