package com.example.Authentication.Fornecedores.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "fornecedor")
public class Fornecedor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Short id;

    private String sobrenome;

    @Column(name = "nome_razao_social")
    private String nomeRazaoSocial;

    @Column(name = "nome_fantasia")
    private String nomeFantasia;

    @Column(name = "data_nascimento")
//    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", timezone="GMT-3")
    private Date dataNascimento;

    private String cpfCnpj;

    private String numero;

    private String rg;

    private String cep;

    private String rua;

    private String Bairro;

    private String cidade;

    private String estado;

    private String telefone;

    private String email;

    private Integer ativo;

}
