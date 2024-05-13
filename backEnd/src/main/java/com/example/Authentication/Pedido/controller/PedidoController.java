package com.example.Authentication.Pedido.controller;

import com.example.Authentication.FormaPagamento.DTO.FormaPagamentoDTO;
import com.example.Authentication.Pedido.DTO.PedidoCompletoDTO;
import com.example.Authentication.Pedido.DTO.PedidoDTO;
import com.example.Authentication.Pedido.DTO.PedidoListagemDTO;
import com.example.Authentication.Pedido.model.Pedido;
import com.example.Authentication.Pedido.service.PedidoService;
import com.example.Authentication.Utils.Interfaces.LocaleInteface;
import com.example.Authentication.Utils.filtro.Filtro;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/pedido")
@Slf4j
public class PedidoController {

    private final MessageSource messageSource;
    private final PedidoService pedidoService;

    @PostMapping(value = "/list/{id}", produces = "application/json")
    @Operation(summary = "Paginação dos pedidos", description = "Metodo utilizado para paginar os pedidos", tags = "Pedido")
    public Page<PedidoDTO> findAllPageByIdCaixa(@PathVariable Integer id, @RequestBody Filtro filtro) {
     return pedidoService.findAllPageByIdCaixa(id, filtro);
    }

    @PostMapping(value = "/addPedido/{id}", produces = "application/json")
    @Operation(summary = "Adicionar dos novos pedidos", description = "Metodo utilizado para adicionar os pedidos", tags = "Pedido")
    public ResponseEntity<String> addCompra(@RequestBody PedidoDTO pedidoDTO, @PathVariable Integer id) {
        pedidoService.addPedido(pedidoDTO, id);
        return ResponseEntity.status(HttpStatus.CREATED).body(messageSource.getMessage("success.created",
                null, LocaleInteface.BR));
    }

    @PutMapping(value = "/payment/{id}", produces = "application/json")
    @Operation(summary = "Pagamento dos pedidos", description = "Metodo utilizado para realizar pagamento dos pedidos", tags = "Pedido")
    public ResponseEntity<String> payment(@PathVariable Integer id, @RequestBody FormaPagamentoDTO formaPagamentoDTO) {
        pedidoService.paymentPedido(id, formaPagamentoDTO);
        return ResponseEntity.status(HttpStatus.OK).body(messageSource.getMessage("success.payment",
                null, LocaleInteface.BR));
    }

    @PutMapping(value = "/editPedido/{id}", produces = "application/json")
    @Operation(summary = "Edição dos pedidos", description = "Metodo utilizado para editar os pedidos", tags = "Pedido")
    public ResponseEntity<String> editPedido(@PathVariable Integer id, @RequestBody PedidoDTO pedidoDTO) {
        pedidoService.editPedido(id, pedidoDTO);
        return ResponseEntity.status(HttpStatus.OK).body(messageSource.getMessage("success.edit",
                null, LocaleInteface.BR));
    }

    @DeleteMapping(value = "/delete/{id}", produces = "application/json")
    @Operation(summary = "Deletar pedido", description = "Metodo utilizado para deletar pedidos por ID", tags = "Pedido")
    public ResponseEntity<String> payment(@PathVariable Integer id) {
        pedidoService.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body(messageSource.getMessage("success.delete",
                null, LocaleInteface.BR));
    }

    @GetMapping(value = "/getValorTotal/{id}", produces = "application/json")
    @Operation(summary = "Valor total dos pedidos", description = "Metodo utilizado para buscar os valores totais dos pedidos", tags = "Pedido")
    public Double getValorTotal(@PathVariable Integer id) {
      return pedidoService.getValorTotalByCaixa(id);
    }

    @GetMapping(value = "/findDtoById/{id}", produces = "application/json")
    @Operation(summary = "FindDtoById", description = "Metodo utilizado para buscar o pedidoDTO por ID", tags = "Pedido")
    public PedidoListagemDTO findDtoByIdDto(@PathVariable Integer id) {
        return pedidoService.findDtoById(id);
    }

    @GetMapping(value = "/findById/{id}", produces = "application/json")
    @Operation(summary = "FindById", description = "Metodo utilizado para buscar o pedido por ID", tags = "Pedido")
    public PedidoCompletoDTO findById(@PathVariable Integer id) {
        return pedidoService.findDtoByCompleto(id);
    }
}
