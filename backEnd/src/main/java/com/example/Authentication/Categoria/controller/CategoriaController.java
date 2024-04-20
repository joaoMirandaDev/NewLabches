package com.example.Authentication.Categoria.controller;

import com.example.Authentication.Categoria.DTO.CategoriaDTO;
import com.example.Authentication.Categoria.service.CategoriaService;
import com.example.Authentication.Colaborador.DTO.ColaboradorDto;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/categoria")
@Slf4j
public class CategoriaController {

    private final CategoriaService categoriaService;
    @GetMapping(value = "/findAll", produces = "application/json")
    @Operation(summary = "Lista de categorias", description = "Metodo utilizado para obter lista", tags = "Categoria")
    public List<CategoriaDTO> findAll() {
        return categoriaService.getAllCategoria();
    }
}

