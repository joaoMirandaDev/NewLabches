package com.example.Authentication.AdicionalEspecialidade.model;

import com.example.Authentication.Mercadoria.model.Mercadoria;
import com.example.Authentication.PedidoEspecialidade.model.PedidoEspecialidade;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "adicional_especialidade")
@AllArgsConstructor
@NoArgsConstructor
public class AdicionalEspecialidade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @OneToOne
    @JoinColumn(name = "id_mercadoria", referencedColumnName = "id")
    private Mercadoria mercadoria;
    @ManyToOne
    @JoinColumn(name = "id_pedidos_especialidade", referencedColumnName = "id")
    private PedidoEspecialidade pedidoEspecialidade;
    private Integer quantidade;
}
