package com.example.Authentication.PedidoEspecialidade.repository;

import com.example.Authentication.PedidoEspecialidade.model.PedidoEspecialidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PedidoEspecialidadeRepository extends JpaRepository<PedidoEspecialidade, Integer> {
    @Query(nativeQuery = true, value = "SELECT pe.id_especialidade, SUM(pe.quantidade) AS quantidade FROM " +
            " pedidos_especialidade pe GROUP BY pe.id_especialidade ORDER BY quantidade  DESC LIMIT 5")
    List<Object[]> getListPedidoEspecialidade();
}
