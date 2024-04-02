package com.example.Authentication.Colaborador.controller;

import com.example.Authentication.Utils.filtro.Filtro;
import com.example.Authentication.Colaborador.DTO.ColaboradorDto;
import com.example.Authentication.Colaborador.model.Colaborador;
import com.example.Authentication.Colaborador.service.ColaboradorService;
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
    public ResponseEntity<String> salvarPessoa(@RequestBody ColaboradorDto colaboradorDto) throws Exception {
        colaboradorService.adicionarPessoa(colaboradorDto);
        return ResponseEntity.ok("Pessoa Cadastrada com sucesso");
    }
    @GetMapping(value = "/findById/{id}", produces = "application/json")
    public ColaboradorDto findById(@PathVariable Short id) {
        return colaboradorService.findById(id);
    }

    @DeleteMapping(value = "/deleteById/{id}", produces = "application/json")
    public ResponseEntity<String> deleteById(@PathVariable Short id) {
        return colaboradorService.deleteById(id);
    }


    @PostMapping(value = "/list", produces = "application/json")
    public Page<Colaborador> findAllPessoa(@RequestBody Filtro filtro) {
        return colaboradorService.findAllPessoa(filtro);
    }

    @PutMapping(value = "/editar", produces = "application/json")
    public void editar(@RequestBody ColaboradorDto colaboradorDto) throws Exception {
        colaboradorService.editar(colaboradorDto);
    }

    @GetMapping(value = "/findByCpfCnpj/{CpfCnpj}", produces = "application/json")
    public ColaboradorDto findById(@PathVariable String CpfCnpj) {
        return colaboradorService.findByCpfCnpj(CpfCnpj);
    }
}

