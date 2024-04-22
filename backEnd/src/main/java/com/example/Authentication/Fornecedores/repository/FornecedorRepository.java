package com.example.Authentication.Fornecedores.repository;

import com.example.Authentication.Fornecedores.model.Fornecedor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FornecedorRepository extends JpaRepository<Fornecedor, Integer> {
    @Query(nativeQuery = true, value = "SELECT * FROM fornecedor p WHERE " +
            "(:search IS NULL OR :search = '' OR p.nome_razao_social LIKE %:search% OR p.cpf_cnpj " +
            "LIKE %:search% OR p.nome_fantasia LIKE %:search% OR p.telefone LIKE %:search%)")
    Page<Fornecedor> findAll(Pageable pageable, @Param("search") String search);
}
