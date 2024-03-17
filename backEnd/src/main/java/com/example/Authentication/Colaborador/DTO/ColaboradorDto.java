package com.example.Authentication.Colaborador.DTO;

import com.example.Authentication.Colaborador.model.Colaborador;
import com.example.Authentication.Usuario.model.Usuario;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class ColaboradorDto {

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
    private String estado;
    private String telefone;
    private String email;
    private Usuario usuario;
    private String senha;
    private Short role;


    public ColaboradorDto(Colaborador colaborador) {
        this.id = colaborador.getId();
        this.sobrenome = colaborador.getSobrenome();
        this.nome = colaborador.getNome();
        this.cpf = colaborador.getCpf();
        this.numero = colaborador.getNumero();
        this.rg = colaborador.getRg();
        this.cep = colaborador.getCep();
        this.rua = colaborador.getRua();
        this.Bairro = colaborador.getBairro();
        this.cidade = colaborador.getCidade();
        this.estado = colaborador.getEstado();
        this.telefone = colaborador.getTelefone();
        this.email = colaborador.getEmail();
        this.senha = "";
    }
}
