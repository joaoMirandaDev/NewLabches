package com.example.Authentication.Especialidade.repository;

import com.example.Authentication.Especialidade.model.Especialidade;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EspecialidadeRepository extends JpaRepository<Especialidade, Integer> {

    @Query(nativeQuery = true, value = "SELECT * FROM produtos p INNER JOIN categoria c ON p.categoria_id = c.id WHERE " +
            "(:search IS NULL OR :search = '' OR p.nome LIKE %:search% OR c.nome " +
            "LIKE %:search% OR p.preco LIKE %:search% OR DATE_FORMAT(p.data_cadastro, '%d/%m/%Y') LIKE %:search%)")
    Page<Especialidade> findAll(Pageable pageable, String search);
}
