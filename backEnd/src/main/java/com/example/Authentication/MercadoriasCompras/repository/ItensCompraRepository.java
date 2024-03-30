package com.example.Authentication.MercadoriasCompras.repository;

import com.example.Authentication.Compras.model.Compras;
import com.example.Authentication.MercadoriasCompras.model.ItensCompras;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItensCompraRepository extends JpaRepository<ItensCompras, Integer> {
    @Query(nativeQuery = true, value = "SELECT * FROM item_compra m WHERE m.id_ingrediente = :id AND  " +
            "(:search IS NULL OR :search = '' OR m.valor_compra LIKE %:search%  " +
            "OR m.quantidade LIKE CONCAT('%', :search, '%') OR m.valor_final_unitario LIKE CONCAT('%', :search, '%') OR m.quantidade_final" +
            " LIKE CONCAT('%', :search, '%') OR DATE_FORMAT(m.data, '%d/%m/%Y') LIKE %:search%)")
    Page<ItensCompras> findIngredienteById(Integer id, Pageable pageable,String search);

    @Query(nativeQuery = true, value = "SELECT * FROM item_compra m WHERE m.id_registro_compra = :id")
    List<ItensCompras> findAllRegistroCompraById(Integer id);
}
