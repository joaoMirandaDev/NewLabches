package com.example.Authentication.Fornecedores.DTO;

import com.example.Authentication.Fornecedores.model.Fornecedor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FornecedorListagemDto {
    private Integer id;
    private String nomeRazaoSocial;
    private String telefone;
    private String cpfCnpj;

    public FornecedorListagemDto(Fornecedor fornecedor) {
        this.id = fornecedor.getId();
        this.nomeRazaoSocial = fornecedor.getNomeRazaoSocial();
        this.telefone = fornecedor.getTelefone();
        this.cpfCnpj = fornecedor.getCpfCnpj();
    }
}
