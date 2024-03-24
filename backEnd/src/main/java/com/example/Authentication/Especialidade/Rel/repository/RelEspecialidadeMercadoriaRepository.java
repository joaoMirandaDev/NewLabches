package com.example.Authentication.Especialidade.Rel.repository;

import com.example.Authentication.Especialidade.Rel.model.RelEspecialidadeMercadoria;
import com.example.Authentication.Especialidade.model.Especialidade;
import com.example.Authentication.Mercadoria.model.Mercadoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RelEspecialidadeMercadoriaRepository extends JpaRepository<RelEspecialidadeMercadoria, Integer> {

    RelEspecialidadeMercadoria findByEspecialidadeAndMercadoria(Especialidade especialidade, Mercadoria mercadoria);
}