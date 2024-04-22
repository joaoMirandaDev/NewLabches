package com.example.Authentication.Fornecedores.DTO;

import com.example.Authentication.Fornecedores.model.Fornecedor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.sql.Timestamp;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class FornecedorDto {

    private Integer id;

    private String nomeRazaoSocial;

    private String sobrenome;

    private String nomeFantasia;

    private Date dataNascimento;

    private String cpfCnpj;

    private String numero;

    private String rg;

    private String cep;

    private String rua;

    private String Bairro;

    private String cidade;

    private Integer fornecedor;

    private Integer isUsuario;

    private String estado;

    private String telefone;

    private String email;


    public FornecedorDto(Fornecedor fornecedor) {
        this.id = fornecedor.getId();
        this.nomeFantasia = fornecedor.getNomeFantasia();
        this.nomeRazaoSocial = fornecedor.getNomeRazaoSocial();
    }
}
