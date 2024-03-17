package com.example.Authentication.Fornecedores.controller;

import com.example.Authentication.Fornecedores.DTO.FornecedorDto;
import com.example.Authentication.Fornecedores.DTO.FornecedorListagemDto;
import com.example.Authentication.Utils.filtro.Filtro;
import com.example.Authentication.Fornecedores.model.Fornecedor;
import com.example.Authentication.Fornecedores.service.FornecedorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/fornecedor")
@Slf4j
public class FornecedorController {

    private final FornecedorService fornecedorService;

    @PostMapping(value = "/adicionar", produces = "application/json")
    public ResponseEntity<String> salvarPessoa(@RequestBody FornecedorDto fornecedorDto) throws Exception {
        fornecedorService.adicionarfornecedor(fornecedorDto);
        return ResponseEntity.ok("Pessoa Cadastrada com sucesso");
    }
    @GetMapping(value = "/findById/{id}", produces = "application/json")
    public Fornecedor findById(@PathVariable Short id) {
        return fornecedorService.findById(id);
    }

    @DeleteMapping(value = "/deleteById/{id}", produces = "application/json")
    public ResponseEntity<String> deleteById(@PathVariable Short id) {
        return fornecedorService.deleteById(id);
    }

    @PostMapping(value = "/list", produces = "application/json")
    public Page<FornecedorListagemDto> findAllPessoa(@RequestBody Filtro filtro) {
        return fornecedorService.findAllfornecedor(filtro);
    }

    @PutMapping(value = "/editar", produces = "application/json")
    public void editar(@RequestBody FornecedorDto fornecedorDto) throws Exception {
        fornecedorService.editarFornecedor(fornecedorDto);
    }
}

