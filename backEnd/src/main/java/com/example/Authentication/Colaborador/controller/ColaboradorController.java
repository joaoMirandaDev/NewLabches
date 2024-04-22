package com.example.Authentication.Colaborador.controller;

import com.example.Authentication.Utils.filtro.Filtro;
import com.example.Authentication.Colaborador.DTO.ColaboradorDto;
import com.example.Authentication.Colaborador.model.Colaborador;
import com.example.Authentication.Colaborador.service.ColaboradorService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/colaborador")
@Slf4j
public class ColaboradorController {

    private final ColaboradorService colaboradorService;

    @PostMapping(value = "/adicionar", produces = "application/json")
    @Operation(summary = "Cadastro de colaborador", description = "Metodo utilizado para cadastrar os colaboradores", tags = "Colaborador")
    public ResponseEntity<String> salvarPessoa(@RequestBody ColaboradorDto colaboradorDto) throws Exception {
        colaboradorService.adicionarPessoa(colaboradorDto);
        return ResponseEntity.ok("Pessoa Cadastrada com sucesso");
    }
    @GetMapping(value = "/findById/{id}", produces = "application/json")
    @Operation(summary = "FindById", description = "Metodo utilizado para resgatar o colaborador por ID", tags = "Colaborador")
    public ColaboradorDto findById(@PathVariable Integer id) {
        return colaboradorService.findById(id);
    }

    @DeleteMapping(value = "/deleteById/{id}", produces = "application/json")
    @Operation(summary = "Deletar colaborador", description = "Metodo utilizado para deletar os colaboradores", tags = "Colaborador")
    public ResponseEntity<String> deleteById(@PathVariable Integer id) {
        return colaboradorService.deleteById(id);
    }


    @PostMapping(value = "/list", produces = "application/json")
    @Operation(summary = "Paginação de colaborador", description = "Metodo utilizado para buscar os colaboradores paginados", tags = "Colaborador")
    public Page<Colaborador> findAllPessoa(@RequestBody Filtro filtro) {
        return colaboradorService.findAllPessoa(filtro);
    }

    @PutMapping(value = "/editar", produces = "application/json")
    @Operation(summary = "Editar colaborador", description = "Metodo utilizado para editar os colaboradores por ID", tags = "Colaborador")
    public void editar(@RequestBody ColaboradorDto colaboradorDto) throws Exception {
        colaboradorService.editar(colaboradorDto);
    }

    @GetMapping(value = "/findByCpfCnpj/{CpfCnpj}", produces = "application/json")
    @Operation(summary = "findByCpfCnpj", description = "Metodo utilizado para resgatar os colaboradores por CPF", tags = "Colaborador")
    public ColaboradorDto findById(@PathVariable String CpfCnpj) {
        return colaboradorService.findByCpfCnpj(CpfCnpj);
    }
}

