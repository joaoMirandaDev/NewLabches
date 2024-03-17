package com.example.Authentication.ItensCompras.DTO;

import com.example.Authentication.Itens.DTO.ItemDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ItensComprasDTO {

    private Integer id;
    private ItemDTO itemDTO;
    private Double quantidade;
    private Date data;
    private Double valorCompra;
}
