package com.example.Authentication.Caixa.controller;

import com.example.Authentication.Caixa.DTO.CaixaDTO;
import com.example.Authentication.Caixa.DTO.CaixaOpenDTO;
import com.example.Authentication.Caixa.service.CaixaService;
import com.example.Authentication.Utils.filtro.Filtro;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/caixa")
@Slf4j
public class CaixaController {
    private final CaixaService caixaService;
    @PostMapping("/list")
    @Operation(summary = "Paginação", description = "Metodo que retorna todos os registro de caixa em pagina", tags = "Caixa")
    public Page<CaixaDTO> findAllByPage(@RequestBody Filtro filtro) {
        return caixaService.findAllByPage(filtro);
    }

    @PostMapping(value = "/openCaixa", produces = "application/json")
    @Operation(summary = "Abertura de caixa", description = "Metodo utilizado para abertura do caixa", tags = "Caixa")
    public CaixaDTO findAllByPage(@RequestBody CaixaOpenDTO caixaDTO) {
        return caixaService.openCaixa(caixaDTO);
    }

    @GetMapping(value = "/findById/{id}", produces = "application/json")
    @Operation(summary = "Busca por ID", description = "Metodo para busca do caixa por ID", tags = "Caixa")
    public CaixaDTO findById(@PathVariable Integer id ) {
        return caixaService.findByIdDto(id);
    }
}
