package com.example.Authentication.UnidadeMedida.repository;

import com.example.Authentication.Produtos.model.Produtos;
import com.example.Authentication.UnidadeMedida.model.UnidadeMedida;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UnidadeMedidaRepository extends JpaRepository<UnidadeMedida, Integer> {

}
