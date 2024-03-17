package com.example.Authentication.Colaborador.model;

import com.example.Authentication.Usuario.model.Usuario;
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
@Table(name = "colaborador")
public class Colaborador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Short id;
    private String sobrenome;
    private String nome;
    private Date data_nascimento;
    private String cpf;
    private String numero;
    private String rg;
    private String cep;
    private String rua;
    private String Bairro;
    private String cidade;
    private Integer isUsuario;
    private String estado;
    private String telefone;
    private String email;
}
