package com.example.Authentication.Compras.controller;

import com.example.Authentication.Compras.DTO.ComprasPageDto;
import com.example.Authentication.Utils.filtro.Filtro;
import com.example.Authentication.Compras.DTO.ComprasDto;
import com.example.Authentication.Compras.model.Compras;
import com.example.Authentication.Compras.service.ComprasService;
import com.example.Authentication.Utils.filtro.FiltroDate;
import io.swagger.v3.oas.annotations.Operation;
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
    @Operation(summary = "Adicionar compras", description = "Metodo utilizado para inserir novas compras", tags = "Compras")
    public void addCompra(@RequestBody ComprasDto comprasDto) {
        comprasService.addCompras(comprasDto);
    }

    @PutMapping(value = "/edit", produces = "application/json")
    @Operation(summary = "Editar compras", description = "Metodo utilizado para editar as compras", tags = "Compras")
    public void edit(@RequestBody ComprasDto comprasDto) {
        comprasService.editar(comprasDto);
    }

    @DeleteMapping(value = "/deleteById/{id}")
    @Operation(summary = "deletar compra", description = "Metodo utilizado para deletar por ID", tags = "Compras")
    public void deleteById(@PathVariable Integer id) {
        comprasService.deleteById(id);
    }

    @PostMapping(value = "/list", produces = "application/json")
    @Operation(summary = "Paginação compras", description = "Metodo utilizado para paginar compras", tags = "Compras")
    public Page<ComprasPageDto> findAllByPage(@RequestBody Filtro filtro) {
       return comprasService.findAllByPage(filtro);
    }

    @PostMapping(value = "/getValorCompras", produces = "application/json")
    @Operation(summary = "Valor total de comras", description = "Metodo utilizado para buscar valor total das compras",
            tags = "Compras")
    public Double GetValorTotalDeCompras(@RequestBody FiltroDate filtro) {
        return comprasService.getValorTotalDeCompras(filtro);
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    @Operation(summary = "FindById", description = "Metodo utilizado para resgatar as compras por ID", tags = "Compras")
    public ComprasDto findAllById(@PathVariable Integer id) {
        return comprasService.findById(id);
    }
}

