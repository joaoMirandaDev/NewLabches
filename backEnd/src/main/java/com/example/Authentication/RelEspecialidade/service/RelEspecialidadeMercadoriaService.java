package com.example.Authentication.RelEspecialidade.service;

import com.example.Authentication.RelEspecialidade.model.RelEspecialidadeMercadoria;
import com.example.Authentication.RelEspecialidade.repository.RelEspecialidadeMercadoriaRepository;
import com.example.Authentication.Especialidade.model.Especialidade;
import com.example.Authentication.Mercadoria.model.Mercadoria;
import com.example.Authentication.Mercadoria.repository.MercadoriaRepository;
import com.example.Authentication.Utils.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

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
