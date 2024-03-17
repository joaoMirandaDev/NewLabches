package com.example.Authentication.Produtos.DTO;

import com.example.Authentication.Categoria.DTO.CategoriaDTO;
import com.example.Authentication.Produtos.model.Produtos;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProdutosDTO {

    private Integer id;

    private String nome;

    private CategoriaDTO categoria;

    private String ingrediente;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", timezone="GMT-3")
    private Date data_cadastro;

    private Integer ativo;

    private Double preco;

    private String precoFormatado;

    public ProdutosDTO(Produtos produtos) {
        this.id = produtos.getId();
        this.nome = produtos.getNome();
        this.categoria = new CategoriaDTO(produtos.getCategoria());
        this.ingrediente = produtos.getIngrediente();
        this.data_cadastro = produtos.getData_cadastro();
        this.preco = produtos.getPreco();
//        NumberFormat formatoMoeda = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));
//        String valorFormatado = formatoMoeda.format(produtos.getPreco());
//        this.precoFormatado = valorFormatado;
    }
}
