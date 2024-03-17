package com.example.Authentication.Compras.repository;

import com.example.Authentication.Compras.model.Compras;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ComprasRepository extends JpaRepository<Compras, Integer> {

    @Query(nativeQuery = true, value = "SELECT * FROM colaborador p WHERE p.cpf != '13226726609' AND " +
            "(:search IS NULL OR :search = '' OR " +
            "p.nome LIKE :search OR p.cpf LIKE :search OR p.telefone LIKE :search)")
    Page<Compras> findAll(Pageable pageable, String search);

}
