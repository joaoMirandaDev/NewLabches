package com.example.Authentication.EspecialidadeMercadoria.controller;

import com.example.Authentication.Especialidade.DTO.EspecialidadeDTO;
import com.example.Authentication.Especialidade.service.EspecialidadeService;
import com.example.Authentication.EspecialidadeMercadoria.service.EspecialidadeMercadoriaService;
import com.example.Authentication.Utils.filtro.Filtro;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/especialidadeMercadoria")
@Slf4j
public class EspecialidadeMercadoriaController {

    private final EspecialidadeMercadoriaService especialidadeMercadoriaService;
}

