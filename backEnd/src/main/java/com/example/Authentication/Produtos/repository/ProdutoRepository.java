package com.example.Authentication.Produtos.repository;

import com.example.Authentication.Fornecedores.model.Fornecedor;
import com.example.Authentication.Produtos.model.Produtos;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends JpaRepository<Produtos, Integer> {

    @Query(nativeQuery = true, value = "SELECT * FROM produtos p INNER JOIN categoria c ON p.categoria_id = c.id WHERE " +
            "(:search IS NULL OR :search = '' OR p.nome LIKE %:search% OR c.nome " +
            "LIKE %:search% OR p.preco LIKE %:search% OR DATE_FORMAT(p.data_cadastro, '%d/%m/%Y') LIKE %:search%)")
    Page<Produtos> findAll(Pageable pageable, String search);
}
