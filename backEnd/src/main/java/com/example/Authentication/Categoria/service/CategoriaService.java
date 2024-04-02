package com.example.Authentication.Categoria.service;

import com.example.Authentication.Categoria.DTO.CategoriaDTO;
import com.example.Authentication.Categoria.model.Categoria;
import com.example.Authentication.Categoria.repository.CategoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoriaService {

    private final MessageSource messageSource;
    Locale locale = new Locale("pt", "BR");

    private final CategoriaRepository categoriaRepository;

    public List<CategoriaDTO> getAllCategoria() {
        List<Categoria> categoria = categoriaRepository.findAll();
        return categoria.stream().map(CategoriaDTO::new).collect(Collectors.toList());

    }


}
