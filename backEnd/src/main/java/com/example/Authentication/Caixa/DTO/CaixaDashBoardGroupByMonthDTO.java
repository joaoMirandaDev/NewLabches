package com.example.Authentication.Caixa.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CaixaDashBoardGroupByMonthDTO {
    private String data;
    private Double valorTotal;
}
