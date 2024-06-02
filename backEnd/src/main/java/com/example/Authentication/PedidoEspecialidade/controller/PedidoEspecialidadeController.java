package com.example.Authentication.PedidoEspecialidade.controller;

import com.example.Authentication.PedidoEspecialidade.DTO.PedidoEspecialidadeTopItensDTO;
import com.example.Authentication.PedidoEspecialidade.service.PedidoEspecialidadeService;
import com.example.Authentication.Utils.filtro.FiltroDate;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/pedidoEspecialidade")
@Slf4j
public class PedidoEspecialidadeController {
    private final PedidoEspecialidadeService pedidoEspecialidadeService;

    @PostMapping(value = "/getTopPedidosEspecialidade", produces = "application/json")
    @Operation(summary = "Top 5 itens", description = "Metodo utilizado para buscar as especialidades mais pedidas", tags = "PedidoEspecialidade")
    public ResponseEntity<List<PedidoEspecialidadeTopItensDTO>> getValorTotal(@RequestBody FiltroDate filtroDate) throws ParseException {
        return ResponseEntity.ok(pedidoEspecialidadeService.getTopPedidoEspecialidade(filtroDate));
    }

}
