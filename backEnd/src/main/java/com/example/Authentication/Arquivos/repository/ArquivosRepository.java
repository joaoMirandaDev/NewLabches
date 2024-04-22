package com.example.Authentication.Arquivos.repository;

import com.example.Authentication.Arquivos.model.Arquivos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArquivosRepository extends JpaRepository<Arquivos,Integer> {
    @Query(nativeQuery = true, value = "select * FROM financeiro.arquivos_upload WHERE id= :id")
    Optional<Arquivos> find(Short id);
}
