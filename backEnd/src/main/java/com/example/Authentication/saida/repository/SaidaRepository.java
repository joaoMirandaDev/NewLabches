package com.example.Authentication.saida.repository;

import com.example.Authentication.Tipo.model.Tipo;
import com.example.Authentication.saida.model.Saida;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaidaRepository extends JpaRepository<Saida, Integer> {

}
