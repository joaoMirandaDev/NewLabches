package com.example.Authentication.FormaPagamento.controller;

import com.example.Authentication.FormaPagamento.DTO.FormaPagamentoDTO;
import com.example.Authentication.FormaPagamento.service.FormaPagamentoService;
import com.example.Authentication.Fornecedores.DTO.FornecedorDto;
import com.example.Authentication.Fornecedores.DTO.FornecedorListagemDto;
import com.example.Authentication.Fornecedores.model.Fornecedor;
import com.example.Authentication.Fornecedores.service.FornecedorService;
import com.example.Authentication.Utils.filtro.Filtro;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/formaPagamento")
@Slf4j
public class FormaPagamentoController {

    private final FormaPagamentoService formaPagamentoService;
    @GetMapping(value = "/findAll", produces = "application/json")
    public List<FormaPagamentoDTO> findById() {
        return formaPagamentoService.getAllFormaPagamento();
    }

}

