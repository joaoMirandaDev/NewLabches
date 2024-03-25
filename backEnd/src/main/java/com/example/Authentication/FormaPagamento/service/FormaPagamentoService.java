package com.example.Authentication.FormaPagamento.service;

import com.example.Authentication.FormaPagamento.DTO.FormaPagamentoDTO;
import com.example.Authentication.FormaPagamento.model.FormaPagamento;
import com.example.Authentication.FormaPagamento.repository.FormaPagamentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FormaPagamentoService {

    private final FormaPagamentoRepository formaPagamentoRepository;

    public List<FormaPagamentoDTO> getAllFormaPagamento() {
        List<FormaPagamento> formaPagamento = formaPagamentoRepository.findAll();
        return formaPagamento.stream().map(FormaPagamentoDTO::new).collect(Collectors.toList());
    }

}
