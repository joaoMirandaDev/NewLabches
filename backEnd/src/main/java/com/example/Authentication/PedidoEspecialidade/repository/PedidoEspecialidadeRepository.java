package com.example.Authentication.PedidoEspecialidade.repository;

import com.example.Authentication.PedidoEspecialidade.model.PedidoEspecialidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface PedidoEspecialidadeRepository extends JpaRepository<PedidoEspecialidade, Integer> {
    @Query(nativeQuery = true, value = "SELECT pe.id_especialidade, SUM(pe.quantidade) AS quantidade FROM " +
            " pedidos_especialidade pe GROUP BY pe.id_especialidade ORDER BY quantidade  DESC LIMIT 5")
    List<Object[]> getListPedidoEspecialidade();

    @Query(nativeQuery = true, value = "SELECT pe.id_especialidade, SUM(pe.quantidade) AS quantidade FROM " +
            "pedidos_especialidade pe inner join pedido p on " +
            "pe.id_pedido = p.id inner join caixa c " +
            "on p.id_caixa = c.id " +
            "WHERE c.data_abertura BETWEEN :dataInicial AND :dataFinal " +
            "GROUP BY pe.id_especialidade ORDER BY quantidade DESC LIMIT 5")
    List<Object[]> getListPedidoEspecialidadeByPeriodo(Date dataInicial, Date dataFinal);
}
