package com.example.Authentication.Tipo.service;

import com.example.Authentication.Tipo.DTO.TipoDTO;
import com.example.Authentication.Tipo.model.Tipo;
import com.example.Authentication.Tipo.repository.TipoRepository;
import lombok.RequiredArgsConstructor;
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
