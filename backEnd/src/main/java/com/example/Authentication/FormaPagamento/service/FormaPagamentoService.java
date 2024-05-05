package com.example.Authentication.FormaPagamento.service;

import com.example.Authentication.FormaPagamento.DTO.FormaPagamentoDTO;
import com.example.Authentication.FormaPagamento.model.FormaPagamento;
import com.example.Authentication.FormaPagamento.repository.FormaPagamentoRepository;
import com.example.Authentication.Utils.Interfaces.LocaleInteface;
import com.example.Authentication.Utils.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FormaPagamentoService {

    private final FormaPagamentoRepository formaPagamentoRepository;
    private final MessageSource messageSource;
    public List<FormaPagamentoDTO> getAllFormaPagamento() {
        List<FormaPagamento> formaPagamento = formaPagamentoRepository.findAll();
        return formaPagamento.stream().map(FormaPagamentoDTO::new).collect(Collectors.toList());
    }

    public FormaPagamento findById(Integer id) {
        FormaPagamento formaPagamento = formaPagamentoRepository.findById(id).orElseThrow(() ->
                new NotFoundException(messageSource.getMessage("error.isEmpty", null, LocaleInteface.BR)));
        return formaPagamento;
    }

}
