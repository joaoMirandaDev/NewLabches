package com.example.Authentication.TipoPedido.repository;

import com.example.Authentication.TipoPedido.model.TipoPedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoPedidoRepository extends JpaRepository<TipoPedido, Integer> {

}
