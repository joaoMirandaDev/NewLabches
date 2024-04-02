package com.example.Authentication.EspecialidadeMercadoria.DTO;

import com.example.Authentication.Especialidade.DTO.EspecialidadeDTO;
import com.example.Authentication.Especialidade.model.Especialidade;
import com.example.Authentication.EspecialidadeMercadoria.model.EspecialidadeMercadoria;
import com.example.Authentication.Mercadoria.DTO.MercadoriaDTO;
import com.example.Authentication.Mercadoria.DTO.MercadoriaSelectDTO;
import com.example.Authentication.Mercadoria.model.Mercadoria;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EspecialidadeMercadoriaDTO {

    private Integer id;

    private MercadoriaSelectDTO mercadoria;

    private Integer quantidade;

    public EspecialidadeMercadoriaDTO(EspecialidadeMercadoria especialidadeMercadoria) {
        this.id = especialidadeMercadoria.getId();
        this.mercadoria = new MercadoriaSelectDTO(especialidadeMercadoria.getMercadoria());
        this.quantidade = especialidadeMercadoria.getQuantidade();
    }
}
