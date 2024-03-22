package com.example.Authentication.Especialidade.model;

import com.example.Authentication.Categoria.model.Categoria;
import com.example.Authentication.Mercadoria.model.Mercadoria;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "produtos")
public class Especialidade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nome;
    @OneToOne
    @JoinColumn(name = "categoria_id", referencedColumnName = "id")
    private Categoria categoria;
    @Column(name = "data_cadastro")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", timezone="GMT-3")
    private Date data_cadastro;
    private Integer ativo;
    private Double preco;
    @OneToMany
    @JoinTable(name = "rel_especialidades_mercadorias",
            joinColumns = @JoinColumn(name = "id_especialidade", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "id_mercadoria", referencedColumnName = "id")
    )
    private List<Mercadoria> mercadorias;
}
