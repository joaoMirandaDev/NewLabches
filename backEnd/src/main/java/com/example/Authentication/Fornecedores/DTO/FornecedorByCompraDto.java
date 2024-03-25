package com.example.Authentication.Fornecedores.DTO;

import com.example.Authentication.Fornecedores.model.Fornecedor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FornecedorByCompraDto {
    private Short id;
    private String nomeRazaoSocial;

    public FornecedorByCompraDto(Fornecedor fornecedor) {
        this.id = fornecedor.getId();
        this.nomeRazaoSocial = fornecedor.getNomeRazaoSocial();
    }
}
