package com.example.Authentication.Colaborador.repository;

import com.example.Authentication.Colaborador.model.Colaborador;
import com.example.Authentication.Usuario.model.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ColaboradorRepository extends JpaRepository<Colaborador, Short> {

    @Query(nativeQuery = true, value = "SELECT * FROM colaborador p WHERE p.cpf != '13226726609' AND " +
            "(:search IS NULL OR :search = '' OR " +
            "p.nome LIKE :search OR p.cpf LIKE :search OR p.telefone LIKE :search)")
    Page<Colaborador> findAll(Pageable pageable, String search);

    Colaborador findByCpf(String cpf);
}
