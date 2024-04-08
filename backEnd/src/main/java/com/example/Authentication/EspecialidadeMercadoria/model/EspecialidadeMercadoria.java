package com.example.Authentication.EspecialidadeMercadoria.model;

import com.example.Authentication.Especialidade.model.Especialidade;
import com.example.Authentication.Mercadoria.model.Mercadoria;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "especialidade_mercadoria")
public class EspecialidadeMercadoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_especialidade", referencedColumnName = "id")
    private Especialidade especialidade;

    @OneToOne
    @JoinColumn(name = "id_mercadoria", referencedColumnName = "id")
    private Mercadoria mercadoria;

    private Integer quantidade;
}
