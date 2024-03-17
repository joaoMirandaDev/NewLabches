package com.example.Authentication.Produtos.controller;

import com.example.Authentication.Fornecedores.DTO.FornecedorDto;

import com.example.Authentication.Fornecedores.service.FornecedorService;
import com.example.Authentication.Produtos.DTO.ProdutosDTO;
import com.example.Authentication.Produtos.service.ProdutoService;
import com.example.Authentication.Utils.filtro.Filtro;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/produtos")
@Slf4j
public class ProdutoController {

    private final ProdutoService produtoService;

    @PostMapping(value = "/adicionar", produces = "application/json")
    public void salvarPessoa(@RequestBody ProdutosDTO produtosDTO)  {
        produtoService.create(produtosDTO);
    }

    @PutMapping(value = "/editar", produces = "application/json")
    public void editarPessoa(@RequestBody ProdutosDTO produtosDTO)  {
        produtoService.editarById(produtosDTO);
    }

    @PostMapping(value = "/list", produces = "application/json")
    public Page<ProdutosDTO> findAllProdutos(@RequestBody Filtro filtro) throws ParseException {
        return produtoService.findAllProdutos(filtro);
    }

    @GetMapping(value = "/findById/{id}", produces = "application/json")
    public ResponseEntity<ProdutosDTO> findAllProdutos(@PathVariable Integer id) {
        return ResponseEntity.ok(produtoService.findById(id));
    }


    @DeleteMapping(value = "delete/{id}")
    public void deleteProdutoById(@PathVariable Integer id)  {
        produtoService.deleteById(id);
    }


}

