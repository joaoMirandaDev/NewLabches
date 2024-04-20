package com.example.Authentication.Mercadoria.controller;

import com.example.Authentication.Utils.filtro.Filtro;
import com.example.Authentication.Mercadoria.DTO.MercadoriaDTO;
import com.example.Authentication.Mercadoria.DTO.MercadoriaSelectDTO;
import com.example.Authentication.Mercadoria.model.Mercadoria;
import com.example.Authentication.Mercadoria.service.MercadoriaService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mercadoria")
@Slf4j
public class MercadoriaController {

    private final MercadoriaService mercadoriaService;

    @PostMapping(value = "/adicionar", produces = "application/json")
    @Operation(summary = "Registar novas mercadorias", description = "Metodo utilizado para registrar novas os mercadorias", tags = "Mercadoria")
    public void saveIngrediente(@RequestBody MercadoriaDTO ingrediente)  {
        mercadoriaService.cadastro(ingrediente);
    }

    @PutMapping(value = "/editar", produces = "application/json")
    @Operation(summary = "Editar mercadorias", description = "Metodo utilizado para editar as mercadorias", tags = "Mercadoria")
    public void editIngrediente(@RequestBody MercadoriaDTO ingrediente)  {
        mercadoriaService.editar(ingrediente);
    }

    @GetMapping(value = "/findById/{id}", produces = "application/json")
    @Operation(summary = "FindById", description = "Metodo utilizado para resgatar as mercadorias por ID", tags = "Mercadoria")
    public Mercadoria findById(@PathVariable Integer id)  {
        return mercadoriaService.findById(id);
    }

    @GetMapping(value = "/findAll", produces = "application/json")
    @Operation(summary = "Listar as mercadorias", description = "Metodo utilizado para listar as mercadorias", tags = "Mercadoria")
    public List<MercadoriaSelectDTO> findAll()  {
        return mercadoriaService.findAll();
    }

    @DeleteMapping(value = "/deleteById/{id}", produces = "application/json")
    @Operation(summary = "Deletar as mercadorias por ID", description = "Metodo utilizado para deletar as mercadorias", tags = "Mercadoria")
    public void deleteById(@PathVariable Integer id)  {
        mercadoriaService.deleteById(id);
    }

    @PostMapping(value = "/list", produces = "application/json")
    @Operation(summary = "Paginação das mercadorias", description = "Metodo utilizado para paginas as mercadorias", tags = "Mercadoria")
    public Page<Mercadoria> findAllPessoa(@RequestBody Filtro filtro) {
        return mercadoriaService.findAllByPage(filtro);
    }
}

