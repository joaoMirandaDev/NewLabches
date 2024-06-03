package com.example.Authentication.Caixa.repository;

import com.example.Authentication.Caixa.DTO.CaixaDashBoardDTO;
import com.example.Authentication.Caixa.DTO.CaixaDashBoardGroupByMonthDTO;
import com.example.Authentication.Caixa.model.Caixa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface CaixaRepository extends JpaRepository<Caixa, Integer> {
    @Query(nativeQuery = true, value = "SELECT * FROM caixa p  WHERE " +
            "(:search IS NULL OR :search = '' OR p.numero_caixa LIKE CONCAT('%', :search, '%') OR p.valor_abertura_caixa LIKE CONCAT('%', :search, '%')" +
            " OR p.valor_fechamento_caixa LIKE CONCAT('%', :search, '%') OR DATE_FORMAT(p.data_abertura, '%d/%m/%Y') LIKE CONCAT('%', :search, '%')" +
            " OR DATE_FORMAT(p.data_fechamento, '%d/%m/%Y') LIKE CONCAT('%', :search, '%'))")
    Page<Caixa> findAll(Pageable pageable, String search);

    @Query(nativeQuery = true, value = "SELECT * " +
            "FROM caixa c " +
            "WHERE c.data_abertura BETWEEN :dataInicial AND :dataFinal " +
            "ORDER BY c.data_abertura DESC")
    List<Caixa> getValuesFechamentoAndDateCaixaByDashBoard(Date dataInicial, Date dataFinal);

    @Query(nativeQuery = true, value = "SELECT " +
            " DATE_FORMAT(c.data_abertura, '%M') AS mes, " +
            " DATE_FORMAT(c.data_abertura, '%Y') AS ano, " +
            " SUM(c.valor_fechamento_caixa) AS valor_total " +
            "FROM " +
            "caixa c " +
            "GROUP BY " +
            "ano, mes " +
            "ORDER BY " +
            "ano DESC, " +
            "mes DESC " +
            "LIMIT 2;")
    List<Object[]> getValuesCaixaByGroupByMes();
}
