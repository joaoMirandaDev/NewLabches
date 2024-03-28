package com.example.Authentication.Especialidade.Rel.service;

import com.example.Authentication.Categoria.model.Categoria;
import com.example.Authentication.Categoria.repository.CategoriaRepository;
import com.example.Authentication.Especialidade.DTO.EspecialidadeDTO;
import com.example.Authentication.Especialidade.Rel.model.RelEspecialidadeMercadoria;
import com.example.Authentication.Especialidade.Rel.repository.RelEspecialidadeMercadoriaRepository;
import com.example.Authentication.Especialidade.model.Especialidade;
import com.example.Authentication.Especialidade.repository.EspecialidadeRepository;
import com.example.Authentication.Mercadoria.DTO.MercadoriaDTO;
import com.example.Authentication.Mercadoria.model.Mercadoria;
import com.example.Authentication.Mercadoria.repository.MercadoriaRepository;
import com.example.Authentication.Utils.exceptions.NotFoundException;
import com.example.Authentication.Utils.filtro.Filtro;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class RelEspecialidadeMercadoriaService {

    private final RelEspecialidadeMercadoriaRepository relEspecialidadeMercadoriaRepository;
    private final MercadoriaRepository mercadoriaRepository;
    private final MessageSource messageSource;
    Locale locale = new Locale("pt", "BR");

    public void deleteAndCreateByEspecialidadeMercadoria(Especialidade especialidade, List<Integer> idMercadoria) {
        especialidade.getMercadorias().forEach(mercadoria -> {
            boolean encontrado = idMercadoria.stream()
                    .anyMatch(mercadoriaDTO -> Objects.equals(mercadoria.getId(),mercadoriaDTO));
            if (!encontrado) {
                RelEspecialidadeMercadoria relEspecialidadeMercadoria =  relEspecialidadeMercadoriaRepository.
                        findByEspecialidadeAndMercadoria(especialidade,mercadoria);
                if (Objects.nonNull(relEspecialidadeMercadoria)) {
                    relEspecialidadeMercadoriaRepository.delete(relEspecialidadeMercadoria);
                }
            }
        });
        idMercadoria.forEach(id -> {
            boolean encontrado = especialidade.getMercadorias().stream().anyMatch(mercadoria ->
                    Objects.equals(id, mercadoria.getId()));
            if (!encontrado) {
                RelEspecialidadeMercadoria relEspecialidadeMercadoria = new RelEspecialidadeMercadoria();
                Mercadoria mercadoria = mercadoriaRepository.findById(id).orElseThrow(() ->
                        new NotFoundException(messageSource.getMessage("error.isEmpty", null, locale)));
                relEspecialidadeMercadoria.setMercadoria(mercadoria);
                relEspecialidadeMercadoria.setEspecialidade(especialidade);
                relEspecialidadeMercadoriaRepository.save(relEspecialidadeMercadoria);
            }
        });
    }

}
