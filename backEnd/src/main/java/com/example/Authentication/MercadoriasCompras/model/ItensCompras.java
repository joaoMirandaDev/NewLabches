package com.example.Authentication.MercadoriasCompras.model;

import com.example.Authentication.Compras.model.Compras;
import com.example.Authentication.Mercadoria.model.Mercadoria;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
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
    @JoinColumn(name = "id_registro_compra", referencedColumnName = "id")
    private Compras compras;
    private Double quantidade;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", timezone="GMT-3")
    private Date data;
    @Column(name = "valor_compra")
    private Double valorCompra;
    @Column(name = "valor_final_unitario")
    private Double valorUnitario;
    @Column(name = "quantidade_final")
    private Double quantidadeFinal;
}
