package com.example.Authentication.MercadoriasCompras.controller;

import com.example.Authentication.MercadoriasCompras.DTO.ItensComprasDTO;
import com.example.Authentication.MercadoriasCompras.DTO.ItensComprasPageDTO;
import com.example.Authentication.MercadoriasCompras.service.ItensComprasService;
import com.example.Authentication.Utils.filtro.Filtro;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/merdoriasCompra")
public class MercadoriasComprasController {

    private final ItensComprasService itensComprasService;

    @PostMapping("/list/{id}")
    public Page<ItensComprasPageDTO> findAllByIdMercadoria(@PathVariable  Integer id, @RequestBody Filtro filtro) {
        return itensComprasService.findAllMercadoriaComprasByIdMercadoria(id, filtro);
    }

}
