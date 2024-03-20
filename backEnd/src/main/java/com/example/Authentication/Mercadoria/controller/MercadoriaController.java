package com.example.Authentication.Mercadoria.controller;

import com.example.Authentication.Utils.filtro.Filtro;
import com.example.Authentication.Mercadoria.DTO.MercadoriaDTO;
import com.example.Authentication.Mercadoria.DTO.MercadoriaGripDTO;
import com.example.Authentication.Mercadoria.model.Mercadoria;
import com.example.Authentication.Mercadoria.service.MercadoriaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping(value = "/findAllGrip", produces = "application/json")
    public List<MercadoriaGripDTO> findAllGrip()  {
        return mercadoriaService.findAll();
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

