package com.example.Authentication.Especialidade.DTO;

import com.example.Authentication.Categoria.DTO.CategoriaDTO;
import com.example.Authentication.Especialidade.model.Especialidade;
import com.example.Authentication.EspecialidadeMercadoria.DTO.EspecialidadeMercadoriaDTO;
import com.example.Authentication.EspecialidadeMercadoria.model.EspecialidadeMercadoria;
import com.example.Authentication.Mercadoria.DTO.MercadoriaDTO;
import com.example.Authentication.Mercadoria.model.Mercadoria;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EspecialidadeDTO {

    private Integer id;

    private String nome;

    private CategoriaDTO categoria;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", timezone="GMT-3")
    private Date data_cadastro;

    private Integer ativo;

    private Double preco;

   private List<EspecialidadeMercadoriaDTO> especialidadeMercadoria;

    public EspecialidadeDTO(Especialidade especialidade) {
        this.id = especialidade.getId();
        this.nome = especialidade.getNome();
        this.categoria = new CategoriaDTO(especialidade.getCategoria());
        this.data_cadastro = especialidade.getData_cadastro();
        this.preco = especialidade.getPreco();
        this.especialidadeMercadoria = especialidade.getEspecialidadeMercadorias().stream()
                .map(EspecialidadeMercadoriaDTO::new).collect(Collectors.toList());
    }
}
