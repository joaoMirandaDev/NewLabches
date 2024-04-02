package com.example.Authentication.EspecialidadeMercadoria.service;

import com.example.Authentication.EspecialidadeMercadoria.DTO.EspecialidadeMercadoriaDTO;
import com.example.Authentication.EspecialidadeMercadoria.model.EspecialidadeMercadoria;
import com.example.Authentication.EspecialidadeMercadoria.repository.EspecialidadeMercadoriaRepository;
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
public class EspecialidadeMercadoriaService {

    private final EspecialidadeMercadoriaRepository especialidadeMercadoriaRepository;

    public void create(EspecialidadeMercadoriaDTO especialidadeMercadoriaDTO, Especialidade especialidade) {
        if (Objects.nonNull(especialidadeMercadoriaDTO)) {
            EspecialidadeMercadoria especialidadeMercadoria = new EspecialidadeMercadoria();
            Mercadoria mercadoria = new Mercadoria(especialidadeMercadoriaDTO.getMercadoria());
            especialidadeMercadoria.setMercadoria(mercadoria);
            especialidadeMercadoria.setQuantidade(especialidadeMercadoriaDTO.getQuantidade());
            especialidadeMercadoria.setEspecialidade(especialidade);
            especialidadeMercadoriaRepository.save(especialidadeMercadoria);
        }
    }
    public void delete(EspecialidadeMercadoria especialidadeMercadoria) {
        especialidadeMercadoriaRepository.delete(especialidadeMercadoria);
    }

    public void deleteAndCreateByEspecialidadeMercadoria(List<EspecialidadeMercadoriaDTO> especialidadeMercadoriaDTOList ,Especialidade especialidade) {
        for (EspecialidadeMercadoria banco : especialidade.getEspecialidadeMercadorias()) {
            boolean encontrado = false;
            for (EspecialidadeMercadoriaDTO payload : especialidadeMercadoriaDTOList) {
                if (banco.getMercadoria().getId().equals(payload.getMercadoria().getId())) {
                    encontrado = true;
                    banco.setQuantidade(payload.getQuantidade());
                    especialidadeMercadoriaRepository.save(banco);
                }
            }
            if (!encontrado) {
                this.delete(banco);
            }
        }
        for (EspecialidadeMercadoriaDTO payload : especialidadeMercadoriaDTOList){
            boolean encontrado = false;
            for (EspecialidadeMercadoria banco : especialidade.getEspecialidadeMercadorias()) {
                if (banco.getMercadoria().getId().equals(payload.getMercadoria().getId())) {
                    encontrado = true;
                }
            }
            if (!encontrado) {
                this.create(payload,especialidade);
            }
        }
    }

}
