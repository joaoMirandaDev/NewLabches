package com.example.Authentication.Pedido.repository;

import com.example.Authentication.Pedido.model.Pedido;
import com.example.Authentication.Utils.filtro.Filtro;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {

    @Query(nativeQuery = true, value = "SELECT * FROM pedido p INNER JOIN tipo_pedido tp ON p.id_tipo_pedido = tp.id " +
            " WHERE id_caixa = :id AND " +
            " (:search IS NULL OR p.nome_cliente LIKE CONCAT('%', :search, '%') OR p.mesa LIKE CONCAT('%', :search, '%') " +
            " OR p.numero_pedido LIKE CONCAT('%', :search, '%') OR tp.name LIKE %:search% " +
            " OR p.id_forma_pagamento LIKE CONCAT('%', :search, '%') " +
            " OR p.valor_total = :search)")
    Page<Pedido> findAll(Pageable pageable, Integer id, String search);


    List<Pedido> findByCaixaId(Integer id);
}
