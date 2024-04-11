package com.example.Authentication.TipoPedido.service;

import com.example.Authentication.Tipo.DTO.TipoDTO;
import com.example.Authentication.Tipo.model.Tipo;
import com.example.Authentication.Tipo.repository.TipoRepository;
import com.example.Authentication.TipoPedido.DTO.TipoPedidoDTO;
import com.example.Authentication.TipoPedido.model.TipoPedido;
import com.example.Authentication.TipoPedido.repository.TipoPedidoRepository;
import com.example.Authentication.Utils.Interfaces.LocaleInteface;
import com.example.Authentication.Utils.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TipoPedidoService {

    private final TipoPedidoRepository tipoRepository;
    private final MessageSource messageSource;
    public TipoPedido findById (Integer id) {
        return tipoRepository.findById(id).orElseThrow(() ->
                new NotFoundException(messageSource.getMessage("error.isEmpty", null, LocaleInteface.BR)));
    }

    public List<TipoPedidoDTO> getAll() {
        List<TipoPedido> tipo = tipoRepository.findAll();
        return tipo.stream().map(TipoPedidoDTO::new).collect(Collectors.toList());
    }

}
