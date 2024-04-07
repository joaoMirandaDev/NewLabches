package com.example.Authentication.Caixa.repository;

import com.example.Authentication.Caixa.model.Caixa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CaixaRepository extends JpaRepository<Caixa, Integer> {
    @Query(nativeQuery = true, value = "SELECT * FROM caixa p  WHERE " +
            "(:search IS NULL OR :search = '' OR p.numero_caixa LIKE CONCAT('%', :search, '%') OR p.valor_abertura_caixa LIKE CONCAT('%', :search, '%')" +
            " OR p.valor_fechamento_caixa LIKE CONCAT('%', :search, '%') OR DATE_FORMAT(p.data_abertura, '%d/%m/%Y') LIKE CONCAT('%', :search, '%')" +
            " OR DATE_FORMAT(p.data_fechamento, '%d/%m/%Y') LIKE CONCAT('%', :search, '%'))")
    Page<Caixa> findAll(Pageable pageable, String search);
}
