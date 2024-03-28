package com.example.Authentication.RelEspecialidade.model;

import com.example.Authentication.Especialidade.model.Especialidade;
import com.example.Authentication.Mercadoria.model.Mercadoria;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "rel_especialidades_mercadorias")
public class RelEspecialidadeMercadoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "id_especialidade", referencedColumnName = "id")
    private Especialidade especialidade;

    @OneToOne
    @JoinColumn(name = "id_mercadoria", referencedColumnName = "id")
    private Mercadoria mercadoria;
}
