package com.example.Authentication.Pedido.service;

import com.example.Authentication.Caixa.DTO.CaixaDTO;
import com.example.Authentication.Caixa.model.Caixa;
import com.example.Authentication.Caixa.service.CaixaService;
import com.example.Authentication.Categoria.model.Categoria;
import com.example.Authentication.Compras.DTO.ComprasDto;
import com.example.Authentication.Compras.service.ComprasService;
import com.example.Authentication.FormaPagamento.DTO.FormaPagamentoDTO;
import com.example.Authentication.FormaPagamento.model.FormaPagamento;
import com.example.Authentication.FormaPagamento.service.FormaPagamentoService;
import com.example.Authentication.Mercadoria.service.MercadoriaService;
import com.example.Authentication.Pedido.DTO.PedidoCompletoDTO;
import com.example.Authentication.Pedido.DTO.PedidoDTO;
import com.example.Authentication.Pedido.DTO.PedidoListagemDTO;
import com.example.Authentication.Pedido.model.Pedido;
import com.example.Authentication.Pedido.repository.PedidoRepository;
import com.example.Authentication.PedidoEspecialidade.DTO.PedidoEspecialidadeDTO;
import com.example.Authentication.PedidoEspecialidade.model.PedidoEspecialidade;
import com.example.Authentication.PedidoEspecialidade.service.PedidoEspecialidadeService;
import com.example.Authentication.PedidoMercadoria.DTO.PedidoMercadoriaDTO;
import com.example.Authentication.PedidoMercadoria.service.PedidoMercadoriaService;
import com.example.Authentication.TipoPedido.service.TipoPedidoService;
import com.example.Authentication.Utils.Interfaces.LocaleInteface;
import com.example.Authentication.Utils.exceptions.NotFoundException;
import com.example.Authentication.Utils.filtro.Filtro;
import com.example.Authentication.Utils.pagination.Pagination;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PedidoService  {

    private static final Map<String, String> CAMPO_ORDENACAO = new HashMap<>();
    private final CaixaService caixaService;
    private final PedidoMercadoriaService pedidoMercadoriaService;
    private final MercadoriaService mercadoriaService;
    private final FormaPagamentoService formaPagamentoService;
    private final TipoPedidoService tipoPedidoService;
    private final PedidoEspecialidadeService pedidoEspecialidadeService;
    private final MessageSource messageSource;
    private final PedidoRepository pedidoRepository;
    static {
        CAMPO_ORDENACAO.put("nomeCliente", "nome_cliente");
        CAMPO_ORDENACAO.put("mesa", "mesa");
        CAMPO_ORDENACAO.put("numeroPedido", "numero_pedido");
        CAMPO_ORDENACAO.put("valorTotal", "valor_total");
        CAMPO_ORDENACAO.put("tipoPedido.name", "tp.name");
    }

    public Page<PedidoDTO> findAllPageByIdCaixa(Integer id, Filtro filtro) {
        Pageable pageable = Pagination.createPageableFromFiltro(filtro, CAMPO_ORDENACAO, "numero_pedido");
        Page<Pedido> pedidos = pedidoRepository.findAll(pageable ,id, filtro.getSearch());
        return pedidos.map(PedidoDTO::new);
    }

    public Double getValorTotalByCaixa(Integer id) {
        List<Pedido> pedidos = pedidoRepository.findByCaixaId(id);
        if (!pedidos.isEmpty() && Objects.nonNull(pedidos)) {
            Double valor = 0.0;
            for (Pedido obj : pedidos) {
                valor += obj.getValorTotal();
            }
            return valor;
        }
        return 0.0;
    }

    private Double calcularValorTotalPedido(PedidoDTO pedidoDTO) {
        Double total = 0.0;
            if (!pedidoDTO.getPedidoMercadoria().isEmpty() && Objects.nonNull(pedidoDTO.getPedidoMercadoria())) {
                for (PedidoMercadoriaDTO val : pedidoDTO.getPedidoMercadoria()) {
                    Double valorMercadoria = (val.getMercadoria().getValorVenda() * val.getQuantidade());
                    total += valorMercadoria;
                }
            }
            if (!pedidoDTO.getPedidoEspecialidade().isEmpty() && Objects.nonNull(pedidoDTO.getPedidoEspecialidade())) {
                for (PedidoEspecialidadeDTO val : pedidoDTO.getPedidoEspecialidade()) {
                    Double valorEspecialidade = (val.getEspecialidade().getPreco() * val.getQuantidade());
                    total += valorEspecialidade;
                }
            }
        return total;
    }

    @Transactional
    public void addPedido(PedidoDTO pedidoDTO, Integer id) {
        Pedido pedido = new Pedido();
        pedido.setCaixa(caixaService.findById(id));
        pedido.setPago(pedidoDTO.getPago());
        pedido.setNomeCliente(pedidoDTO.getNomeCliente());
        pedido.setObservacao(pedidoDTO.getObservacao());
        pedido.setTipoPedido(tipoPedidoService.findById(pedidoDTO.getTipoPedido().getId()));
        pedido.setMesa(pedidoDTO.getMesa());
        pedido.setValorTotal(this.calcularValorTotalPedido(pedidoDTO));
        pedidoRepository.save(pedido);
        if (Objects.nonNull(pedidoDTO.getPedidoMercadoria()) && !pedidoDTO.getPedidoMercadoria().isEmpty()) {
            pedidoDTO.getPedidoMercadoria().forEach(obj -> {
                pedidoMercadoriaService.create(obj, pedido);
            });
        }
        if (Objects.nonNull(pedidoDTO.getPedidoEspecialidade()) && !pedidoDTO.getPedidoEspecialidade().isEmpty()) {
            pedidoDTO.getPedidoEspecialidade().forEach(obj -> {
                pedidoEspecialidadeService.create(obj, pedido);
            });
        }
    }

    public void paymentPedido(Integer id, FormaPagamentoDTO formaPagamentoDTO) {
        FormaPagamento pagamento = formaPagamentoService.findById(formaPagamentoDTO.getId());
        Pedido pedido = findById(id);
        pedido.setFormaPagamento(pagamento);
        pedido.setPago(1);
        pedidoRepository.save(pedido);
    }

    private Pedido findById(Integer id) {
        Pedido pedido = pedidoRepository.findById(id).orElseThrow(() ->
                new NotFoundException(messageSource.getMessage("error.isEmpty", null, LocaleInteface.BR)));
        return pedido;
    }

    public PedidoCompletoDTO findDtoByCompleto(Integer id) {
        Pedido pedido = findById(id);
        return new PedidoCompletoDTO(pedido);
    }

    public PedidoListagemDTO findDtoById(Integer id) {
        Pedido pedido = findById(id);
        return new PedidoListagemDTO(pedido);
    }

    public void deleteById(Integer id) {
        Pedido pedido = findById(id);
        if (!pedido.getPedidoEspecialidades().isEmpty() && Objects.nonNull(pedido.getPedidoEspecialidades())) {
            pedido.getPedidoEspecialidades().forEach(obj -> {
                obj.getEspecialidade().getEspecialidadeMercadorias().forEach(val -> {
                    mercadoriaService.aumentaSaldo(val.getMercadoria(), val.getQuantidade());
                });
            });
        }
        if (!pedido.getPedidoMercadoria().isEmpty() && Objects.nonNull(pedido.getPedidoMercadoria())) {
            pedido.getPedidoMercadoria().forEach(obj -> {
                mercadoriaService.aumentaSaldo(obj.getMercadoria(), obj.getQuantidade());
            });
        }
        pedidoRepository.delete(pedido);
    }

    public void editPedido(PedidoDTO pedidoDTO) {
        Pedido pedido = this.findById(pedidoDTO.getId());
        pedido.setMesa(pedidoDTO.getMesa());
        pedido.setTipoPedido(tipoPedidoService.findById(pedidoDTO.getTipoPedido().getId()));
        pedido.setObservacao(pedidoDTO.getObservacao());
        pedido.setNomeCliente(pedidoDTO.getNomeCliente());
        pedido.setPago(pedidoDTO.getPago());
        pedido.setValorTotal(calcularValorTotalPedido(pedidoDTO));
        pedidoRepository.save(pedido);
        pedidoMercadoriaService.createUpdateDelete(pedido, pedidoDTO.getPedidoMercadoria());
        pedidoEspecialidadeService.createUpdateDelete(pedido, pedidoDTO.getPedidoEspecialidade());
    }
}
