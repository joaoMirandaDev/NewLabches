package com.example.Authentication.Caixa.controller;

import com.example.Authentication.Caixa.DTO.CaixaDTO;
import com.example.Authentication.Caixa.service.CaixaService;
import com.example.Authentication.Utils.filtro.Filtro;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
