package com.example.Authentication.Fornecedores.controller;

import com.example.Authentication.Fornecedores.DTO.FornecedorDto;
import com.example.Authentication.Fornecedores.DTO.FornecedorListagemDto;
import com.example.Authentication.Fornecedores.DTO.FornecedorSelectDto;
import com.example.Authentication.Utils.filtro.Filtro;
import com.example.Authentication.Fornecedores.model.Fornecedor;
import com.example.Authentication.Fornecedores.service.FornecedorService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/fornecedor")
@Slf4j
public class FornecedorController {

    private final FornecedorService fornecedorService;

    @PostMapping(value = "/adicionar", produces = "application/json")
    @Operation(summary = "Cadastro de fornecedor", description = "Metodo utilizado para cadastrar os fornecedores", tags = "Fornecedor")
    public ResponseEntity<String> salvarPessoa(@RequestBody FornecedorDto fornecedorDto) throws Exception {
        fornecedorService.adicionarfornecedor(fornecedorDto);
        return ResponseEntity.ok("Pessoa Cadastrada com sucesso");
    }
    @GetMapping(value = "/findById/{id}", produces = "application/json")
    @Operation(summary = "FindById", description = "Metodo utilizado para resgatar os fornecedores por ID", tags = "Fornecedor")
    public Fornecedor findById(@PathVariable Integer id) {
        return fornecedorService.findById(id);
    }

    @DeleteMapping(value = "/deleteById/{id}", produces = "application/json")
    @Operation(summary = "DeleteById", description = "Metodo utilizado para deletar os fornecedores por ID", tags = "Fornecedor")
    public ResponseEntity<String> deleteById(@PathVariable Integer id) {
        return fornecedorService.deleteById(id);
    }

    @PostMapping(value = "/list", produces = "application/json")
    @Operation(summary = "Paginação de fornecedores", description = "Metodo utilizado para paginar os fornecedores", tags = "Fornecedor")
    public Page<FornecedorListagemDto> findAllPessoa(@RequestBody Filtro filtro) {
        return fornecedorService.findAllfornecedor(filtro);
    }

    @PutMapping(value = "/editar", produces = "application/json")
    @Operation(summary = "Editar os fornecedores", description = "Metodo utilizado para editar os fornecedores", tags = "Fornecedor")
    public void editar(@RequestBody FornecedorDto fornecedorDto) throws Exception {
        fornecedorService.editarFornecedor(fornecedorDto);
    }

    @GetMapping(value = "/findAll", produces = "application/json")
    @Operation(summary = "Listagem de forncedores", description = "Metodo utilizado para listar os fornecedores", tags = "Fornecedor")
    public List<FornecedorSelectDto> findAll() {
        return fornecedorService.findAll();
    }
}

