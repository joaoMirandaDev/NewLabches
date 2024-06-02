package com.example.Authentication.Pedido.repository;

import com.example.Authentication.Pedido.DTO.PedidoGraficoDTO;
import com.example.Authentication.Pedido.model.Pedido;
import com.example.Authentication.Utils.filtro.Filtro;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {

    @Query(nativeQuery = true, value = "SELECT * FROM pedido p INNER JOIN tipo_pedido tp ON p.id_tipo_pedido = tp.id " +
            " WHERE id_caixa = :id AND " +
            " (:search IS NULL OR p.nome_cliente LIKE CONCAT('%', :search, '%') OR p.mesa LIKE CONCAT('%', :search, '%') " +
            " OR p.numero_pedido LIKE CONCAT('%', :search, '%') OR tp.name LIKE %:search% " +
            " OR p.id_forma_pagamento LIKE CONCAT('%', :search, '%') " +
            " OR p.valor_total = :search)")
    Page<Pedido> findAll(Pageable pageable, Integer id, String search);


    List<Pedido> findByCaixaId(Integer id);

    @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM pedido")
    Integer getQuantidadePedidos();

    @Query(nativeQuery = true, value = "SELECT COUNT(*)  FROM pedido p inner join caixa c " +
            "on p.id_caixa  = c.id WHERE c.data_abertura BETWEEN :dataInicial AND :dataFinal")
    Integer getTotalPedidosByPeriodo(Date dataInicial, Date dataFinal);

    @Query(nativeQuery = true, value = "SELECT SUM(p.valor_total)  FROM pedido p")
    Double getTotalVendas();

    @Query(nativeQuery = true, value = "SELECT SUM(p.valor_total)  FROM pedido p inner join caixa c " +
            "on p.id_caixa  = c.id WHERE c.data_abertura BETWEEN :dataInicial AND :dataFinal")
    Double getTotalVendasByPeriodo(Date dataInicial, Date dataFinal);

    @Query(nativeQuery = true, value = "SELECT p.id_forma_pagamento, SUM(p.valor_total) as valor " +
            "FROM pedido p " +
            "GROUP BY p.id_forma_pagamento")
    List<Object[]> getValorTotalVendasByFormaPagamento();

    @Query(nativeQuery = true, value = "SELECT p.id_forma_pagamento, SUM(p.valor_total) as valor " +
            "FROM pedido p inner join caixa c on p.id_caixa  = c.id WHERE " +
            "c.data_abertura BETWEEN :dataInicial AND :dataFinal " +
            "GROUP BY p.id_forma_pagamento")
    List<Object[]> getValorTotalVendasByFormaPagamentoByPeriodo(Date dataInicial, Date dataFinal);
}
