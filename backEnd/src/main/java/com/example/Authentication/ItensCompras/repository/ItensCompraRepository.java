package com.example.Authentication.ItensCompras.repository;

import com.example.Authentication.ItensCompras.model.ItensCompras;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItensCompraRepository extends JpaRepository<ItensCompras, Integer> {
}
