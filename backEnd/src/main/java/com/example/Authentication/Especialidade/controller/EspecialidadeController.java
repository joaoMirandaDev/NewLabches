package com.example.Authentication.Especialidade.controller;

import com.example.Authentication.Especialidade.DTO.EspecialidadeDTO;
import com.example.Authentication.Especialidade.DTO.EspecialidadeSelectDTO;
import com.example.Authentication.Especialidade.service.EspecialidadeService;
import com.example.Authentication.Utils.filtro.Filtro;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/especialidade")
@Slf4j
public class EspecialidadeController {

    private final EspecialidadeService especialidadeService;

    @PostMapping(value = "/adicionar", produces = "application/json")
    public void salvarPessoa(@RequestBody EspecialidadeDTO especialidadeDTO)  {
        especialidadeService.create(especialidadeDTO);
    }

    @PutMapping(value = "/editar", produces = "application/json")
    public void editarPessoa(@RequestBody EspecialidadeDTO especialidadeDTO)  {
        especialidadeService.editarById(especialidadeDTO);
    }

    @PostMapping(value = "/list", produces = "application/json")
    public Page<EspecialidadeDTO> findAllProdutos(@RequestBody Filtro filtro) {
        return especialidadeService.findAllProdutos(filtro);
    }

    @GetMapping(value = "/findById/{id}", produces = "application/json")
    public ResponseEntity<EspecialidadeDTO> findAllProdutos(@PathVariable Integer id) {
        return ResponseEntity.ok(especialidadeService.findByIdDto(id));
    }

    @GetMapping(value = "/findAll", produces = "application/json")
    public List<EspecialidadeSelectDTO> findAll() {
        return especialidadeService.findAll();
    }

    @DeleteMapping(value = "delete/{id}")
    public void deleteProdutoById(@PathVariable Integer id)  {
        especialidadeService.deleteById(id);
    }


}

