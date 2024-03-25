package com.example.Authentication.Compras.controller;

import com.example.Authentication.Compras.DTO.ComprasPageDto;
import com.example.Authentication.Utils.filtro.Filtro;
import com.example.Authentication.Compras.DTO.ComprasDto;
import com.example.Authentication.Compras.model.Compras;
import com.example.Authentication.Compras.service.ComprasService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/compras")
@Slf4j
public class ComprasController {

    private final ComprasService comprasService;
    @PostMapping(value = "/addCompra", produces = "application/json")
    public void addCompra(@RequestBody ComprasDto comprasDto) {
        comprasService.addCompras(comprasDto);
    }

    @DeleteMapping(value = "/deleteById/{id}")
    public void deleteById(@PathVariable Integer id) {
        comprasService.deleteById(id);
    }

    @PostMapping(value = "/list", produces = "application/json")
    public Page<ComprasPageDto> findAllByPage(Filtro filtro) {
       return comprasService.findAllByPage(filtro);
    }
}

