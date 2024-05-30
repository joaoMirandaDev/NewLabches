package com.example.Authentication.PedidoEspecialidade.DTO;

import com.example.Authentication.Especialidade.DTO.EspecialidadeDTO;
import com.example.Authentication.Especialidade.DTO.EspecialidadeSelectDTO;
import com.example.Authentication.Especialidade.model.Especialidade;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PedidoEspecialidadeTopItensDTO {

    private EspecialidadeSelectDTO especialidade;
    private Integer quantidade;

}
