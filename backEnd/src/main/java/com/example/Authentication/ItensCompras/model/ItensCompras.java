package com.example.Authentication.ItensCompras.model;

import com.example.Authentication.Compras.model.Compras;
import com.example.Authentication.mercadoria.model.Mercadoria;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "item_compra")
public class ItensCompras {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @OneToOne
    @JoinColumn(name = "id_ingrediente", referencedColumnName = "id")
    private Mercadoria mercadoria;
    @ManyToOne
    @JsonIgnoreProperties(value = {"listLancheIngrediente", "hibernateLazyInitializer"})
    @JoinColumn(name = "id_registro_compra", referencedColumnName = "id")
    private Compras compras;
    private Double quantidade;
    private Date data;
    @Column(name = "valor_compra")
    private Double valorCompra;
    @Column(name = "valor_final_unitario")
    private Double valorUnitario;
    @Column(name = "quantidade_final")
    private Double quantidadeFinal;
}
