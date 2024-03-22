package com.example.Authentication.Tipo.service;

import com.example.Authentication.Mercadoria.DTO.MercadoriaDTO;
import com.example.Authentication.Mercadoria.DTO.MercadoriaGripDTO;
import com.example.Authentication.Mercadoria.Interface.UnidadeMedidaInterface;
import com.example.Authentication.Mercadoria.model.Mercadoria;
import com.example.Authentication.Mercadoria.repository.MercadoriaRepository;
import com.example.Authentication.Tipo.DTO.TipoDTO;
import com.example.Authentication.Tipo.model.Tipo;
import com.example.Authentication.Tipo.repository.TipoRepository;
import com.example.Authentication.UnidadeMedida.model.UnidadeMedida;
import com.example.Authentication.UnidadeMedida.repository.UnidadeMedidaRepository;
import com.example.Authentication.Utils.exceptions.NotFoundException;
import com.example.Authentication.Utils.filtro.Filtro;
import com.example.Authentication.Utils.pagination.PaginationSimple;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TipoService {

        private final TipoRepository tipoRepository;

        public List<TipoDTO> getAll() {
            List<Tipo> tipo = tipoRepository.findAll();
            return tipo.stream().map(TipoDTO::new).collect(Collectors.toList());
        }

}
