package com.example.Authentication.UnidadeMedida.repository;

import com.example.Authentication.UnidadeMedida.model.UnidadeMedida;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UnidadeMedidaRepository extends JpaRepository<UnidadeMedida, Integer> {

}
