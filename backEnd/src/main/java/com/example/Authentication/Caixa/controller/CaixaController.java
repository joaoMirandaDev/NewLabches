package com.example.Authentication.Caixa.controller;

import com.example.Authentication.Caixa.DTO.CaixaDTO;
import com.example.Authentication.Caixa.DTO.CaixaDashBoardDTO;
import com.example.Authentication.Caixa.DTO.CaixaDashBoardGroupByMonthDTO;
import com.example.Authentication.Caixa.DTO.CaixaOpenDTO;
import com.example.Authentication.Caixa.service.CaixaService;
import com.example.Authentication.Utils.Interfaces.LocaleInteface;
import com.example.Authentication.Utils.filtro.Filtro;
import com.example.Authentication.Utils.filtro.FiltroDate;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/caixa")
@Slf4j
public class CaixaController {

    private final CaixaService caixaService;
    private final MessageSource messageSource;

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

    @PostMapping(value = "/getValuesCaixaByDashBoard", produces = "application/json")
    @Operation(summary = "Busca os dados do caixa", description = "Metodo utilizado por padrao a buscar os dados dos ultimos 7 dias para o dashBoard", tags = "Caixa")
    public ResponseEntity<List<CaixaDashBoardDTO>> getValuesCaixaByDashBoard(@RequestBody FiltroDate filtroDate) throws ParseException {
        return ResponseEntity.ok(caixaService.getValuesCaixaByDashBoard(filtroDate));
    }

    @GetMapping(value = "/getValuesCaixaByGroupByMes", produces = "application/json")
    @Operation(summary = "Busca os dados do caixa", description = "Metodo utilizado por padrao a buscar os dados dos ultimos 2 meses para o dashBoard", tags = "Caixa")
    public ResponseEntity<List<CaixaDashBoardGroupByMonthDTO>> getValuesCaixaByGroupByMes() throws ParseException {
        return ResponseEntity.ok(caixaService.getValuesCaixaByGroupByMes());
    }

    @GetMapping(value = "/findById/{id}", produces = "application/json")
    @Operation(summary = "Busca por ID", description = "Metodo para busca do caixa por ID", tags = "Caixa")
    public CaixaDTO findById(@PathVariable Integer id ) {
        return caixaService.findByIdDto(id);
    }

    @PutMapping(value = "/close/{id}", produces = "application/json")
    @Operation(summary = "Fechar caixa", description = "Metodo para fechar o caixa", tags = "Caixa")
    public ResponseEntity<String> fechamentoCaixa(@PathVariable Integer id ) {
        caixaService.close(id);
        return ResponseEntity.status(HttpStatus.OK).body(messageSource.getMessage("success.caixa",
                null, LocaleInteface.BR));
    }
}
