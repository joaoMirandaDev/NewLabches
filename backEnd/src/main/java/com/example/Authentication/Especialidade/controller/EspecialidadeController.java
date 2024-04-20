package com.example.Authentication.Especialidade.controller;

import com.example.Authentication.Especialidade.DTO.EspecialidadeDTO;
import com.example.Authentication.Especialidade.DTO.EspecialidadeSelectDTO;
import com.example.Authentication.Especialidade.service.EspecialidadeService;
import com.example.Authentication.Utils.filtro.Filtro;
import io.swagger.v3.oas.annotations.Operation;
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
    @Operation(summary = "Adicionar especialidade", description = "Metodo utilizado para inserir novas especialidade", tags = "Especialidade")
    public void salvar(@RequestBody EspecialidadeDTO especialidadeDTO)  {
        especialidadeService.create(especialidadeDTO);
    }

    @PutMapping(value = "/editar", produces = "application/json")
    @Operation(summary = "Editar especialidade", description = "Metodo utilizado para editar as especialidade", tags = "Especialidade")
    public void editar(@RequestBody EspecialidadeDTO especialidadeDTO)  {
        especialidadeService.editarById(especialidadeDTO);
    }

    @PostMapping(value = "/list", produces = "application/json")
    @Operation(summary = "Paginação especialidade", description = "Metodo utilizado para paginar as especialidade", tags = "Especialidade")
    public Page<EspecialidadeDTO> findAllEspecialidade(@RequestBody Filtro filtro) {
        return especialidadeService.findAllProdutos(filtro);
    }

    @GetMapping(value = "/findById/{id}", produces = "application/json")
    @Operation(summary = "FindById", description = "Metodo utilizado para buscar as especialidade por ID", tags = "Especialidade")
    public ResponseEntity<EspecialidadeDTO> findByIdEspecialidade(@PathVariable Integer id) {
        return ResponseEntity.ok(especialidadeService.findByIdDto(id));
    }

    @GetMapping(value = "/findAll", produces = "application/json")
    @Operation(summary = "Listar especialidade", description = "Metodo utilizado para listar as especialidade", tags = "Especialidade")
    public List<EspecialidadeSelectDTO> findAll() {
        return especialidadeService.findAll();
    }

    @DeleteMapping(value = "delete/{id}")
    @Operation(summary = "deleteById", description = "Metodo utilizado para deletar as especialidade", tags = "Especialidade")
    public void deleteProdutoById(@PathVariable Integer id)  {
        especialidadeService.deleteById(id);
    }


}

