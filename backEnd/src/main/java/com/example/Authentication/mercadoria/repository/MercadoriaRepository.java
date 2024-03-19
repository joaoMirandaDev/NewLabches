package com.example.Authentication.mercadoria.repository;

import com.example.Authentication.mercadoria.model.Mercadoria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MercadoriaRepository extends JpaRepository<Mercadoria, Integer> {

    @Query(nativeQuery = true, value = "select * from mercadoria rc where UPPER(TRIM(rc.nome)) = UPPER(TRIM(:nome)) " +
            "and LOWER(TRIM(rc.nome)) = LOWER(TRIM(:nome))")
    Mercadoria findByNome(String nome);

    @Query(nativeQuery = true, value = "SELECT * FROM mercadoria m INNER JOIN unidade_medida um ON m.id_unidade_medida = um.id WHERE " +
            "(:search IS NULL OR :search = '' OR m.nome LIKE %:search% OR um.nome " +
            "LIKE %:search% OR m.saldo_estoque LIKE CONCAT('%', :search, '%') OR m.valor_venda LIKE CONCAT('%', :search, '%') OR DATE_FORMAT(m.data_cadastro, '%d/%m/%Y') LIKE %:search%)")
    Page<Mercadoria> findAll(Pageable pageable, String search);
}
