package com.example.Authentication.Pedido.DTO;

import com.example.Authentication.FormaPagamento.DTO.FormaPagamentoDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PedidoGraficoDTO {
    private FormaPagamentoDTO formaPagamentoDTO;
    private Double valor;
}
