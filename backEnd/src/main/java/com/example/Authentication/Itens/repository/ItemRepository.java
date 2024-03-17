package com.example.Authentication.Itens.repository;

import com.example.Authentication.Itens.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {

    @Query(nativeQuery = true, value = "select * from ingrediente rc where UPPER(TRIM(rc.nome)) = UPPER(TRIM(:nome)) " +
            "and LOWER(TRIM(rc.nome)) = LOWER(TRIM(:nome))")
    Item findByNome(String nome);
}
