package com.example.Authentication.EspecialidadeMercadoria.repository;

import com.example.Authentication.EspecialidadeMercadoria.model.EspecialidadeMercadoria;
import com.example.Authentication.Especialidade.model.Especialidade;
import com.example.Authentication.Mercadoria.model.Mercadoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EspecialidadeMercadoriaRepository extends JpaRepository<EspecialidadeMercadoria, Integer> {

}
