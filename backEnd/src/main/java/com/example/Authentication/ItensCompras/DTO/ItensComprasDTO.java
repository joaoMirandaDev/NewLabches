package com.example.Authentication.ItensCompras.DTO;

import com.example.Authentication.mercadoria.DTO.MercadoriaDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ItensComprasDTO {

    private Integer id;
    private MercadoriaDTO mercadoriaDTO;
    private Double quantidade;
    private Date data;
    private Double valorCompra;
}
