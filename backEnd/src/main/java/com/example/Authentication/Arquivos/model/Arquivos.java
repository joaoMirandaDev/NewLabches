package com.example.Authentication.Arquivos.model;


import com.example.Authentication.Usuario.model.Usuario;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "arquivos")
@Getter
@Setter
@RequiredArgsConstructor
public class Arquivos {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Column(name = "nome", columnDefinition = "TEXT")
    private String nome;

    @ManyToOne
    @JoinColumn(name = "usuario_id", referencedColumnName = "id")
    private Usuario usuario;

    public Arquivos(Integer id, String nome,  Usuario usuario) {
        this.id = id;
        this.nome = nome;
        this.usuario = usuario;
    }
}