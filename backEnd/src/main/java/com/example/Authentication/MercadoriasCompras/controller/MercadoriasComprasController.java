package com.example.Authentication.MercadoriasCompras.controller;

import com.example.Authentication.MercadoriasCompras.DTO.ItensComprasDTO;
import com.example.Authentication.MercadoriasCompras.DTO.ItensComprasPageDTO;
import com.example.Authentication.MercadoriasCompras.service.ItensComprasService;
import com.example.Authentication.Utils.filtro.Filtro;
import io.swagger.v3.oas.annotations.Operation;
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
    @Operation(summary = "Paginação das mercadorias por compra", description = "Metodo utilizado paginar", tags = "Mercadoria das compras")
    public Page<ItensComprasPageDTO> findAllByIdMercadoria(@PathVariable  Integer id, @RequestBody Filtro filtro) {
        return itensComprasService.findAllMercadoriaComprasByIdMercadoria(id, filtro);
    }
//
//    @DeleteMapping("{id}")
//    public void delete(@PathVariable  Integer id) {
//         itensComprasService.delete(id);
//    }

}
