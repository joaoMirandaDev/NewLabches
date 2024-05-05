package com.example.Authentication.PedidoEspecialidade.model;

import com.example.Authentication.AdicionalEspecialidade.model.AdicionalEspecialidade;
import com.example.Authentication.Especialidade.model.Especialidade;
import com.example.Authentication.Pedido.model.Pedido;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "pedidos_especialidade")
@AllArgsConstructor
@NoArgsConstructor
public class PedidoEspecialidade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @OneToOne
    @JoinColumn(name = "id_especialidade", referencedColumnName = "id")
    private Especialidade especialidade;
    @ManyToOne
    @JoinColumn(name = "id_pedido", referencedColumnName = "id")
    private Pedido pedido;
    private Integer quantidade;
    @OneToMany(mappedBy = "pedidoEspecialidade")
    private List<AdicionalEspecialidade> adicionalEspecialidades;
    @Column(name = "valor_pedido_especialidade")
    private Double valor;

}
