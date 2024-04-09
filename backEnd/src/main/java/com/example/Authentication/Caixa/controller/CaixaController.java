package com.example.Authentication.Caixa.controller;

import com.example.Authentication.Caixa.DTO.CaixaDTO;
import com.example.Authentication.Caixa.service.CaixaService;
import com.example.Authentication.Utils.filtro.Filtro;
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
    public Page<CaixaDTO> findAllByPage(@RequestBody Filtro filtro) {
        return caixaService.findAllByPage(filtro);
    }

    @PostMapping(value = "/openCaixa", produces = "application/json")
    public CaixaDTO findAllByPage(@RequestBody CaixaDTO caixaDTO) {
        return caixaService.openCaixa(caixaDTO);
    }

    @GetMapping(value = "/findById/{id}", produces = "application/json")
    public CaixaDTO findById(@PathVariable Integer id ) {
        return caixaService.findByIdDto(id);
    }
}
