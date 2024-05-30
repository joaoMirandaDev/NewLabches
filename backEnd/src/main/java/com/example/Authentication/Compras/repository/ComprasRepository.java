package com.example.Authentication.Compras.repository;

import com.example.Authentication.Compras.model.Compras;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface ComprasRepository extends JpaRepository<Compras, Integer> {

    @Query(nativeQuery = true, value = "SELECT * FROM compras c INNER JOIN fornecedor f ON c.id_fornecedor = f.id " +
            "INNER JOIN forma_pagamento fp ON c.id_forma_pagamento = fp.id  WHERE " +
            "(:search IS NULL OR :search = '' OR c.valor_total_compra LIKE %:search% OR fp.nome LIKE %:search% OR f.nome_razao_social " +
            "LIKE %:search% OR f.nome_fantasia LIKE %:search% OR DATE_FORMAT(c.data_compra, '%d/%m/%Y') LIKE %:search%)")
    Page<Compras> findAll(Pageable pageable, String search);

    @Query(nativeQuery = true, value = "SELECT SUM(c.valor_total_compra) FROM compras c")
    Double getTotalCompras();

    @Query(nativeQuery = true, value = "SELECT SUM(c.valor_total_compra) FROM compras c " +
            " WHERE c.data_compra BETWEEN :dataInicial AND :dataFinal")
    Double getTotalComprasByPeriodo(Date dataInicial, Date dataFinal);
}
