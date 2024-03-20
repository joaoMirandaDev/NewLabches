package com.example.Authentication.MercadoriasCompras.service;

import com.example.Authentication.Compras.model.Compras;
import com.example.Authentication.Mercadoria.model.Mercadoria;
import com.example.Authentication.Mercadoria.repository.MercadoriaRepository;
import com.example.Authentication.Mercadoria.service.MercadoriaService;
import com.example.Authentication.MercadoriasCompras.DTO.ItensComprasDTO;
import com.example.Authentication.MercadoriasCompras.DTO.ItensComprasPageDTO;
import com.example.Authentication.MercadoriasCompras.model.ItensCompras;
import com.example.Authentication.MercadoriasCompras.repository.ItensCompraRepository;
import com.example.Authentication.Utils.Interfaces.LocaleInteface;
import com.example.Authentication.Utils.exceptions.NotFoundException;
import com.example.Authentication.Utils.filtro.Filtro;
import com.example.Authentication.Utils.pagination.PaginationSimple;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItensComprasService {

    private final MessageSource messageSource;

    private final MercadoriaRepository mercadoriaRepository;
    private final MercadoriaService mercadoriaService;
    private final ItensCompraRepository itensCompraRepository;
    private final PaginationSimple paginationSimple;
    private static final Map<String, String> CAMPO_ORDENACAO = new HashMap<>();

    static {
        CAMPO_ORDENACAO.put("nome", "nome");
        CAMPO_ORDENACAO.put("unidadeMedida.nome", "um.nome");
        CAMPO_ORDENACAO.put("saldoEstoque", "saldo_estoque");
        CAMPO_ORDENACAO.put("valorVenda", "valor_venda");
        CAMPO_ORDENACAO.put("dataCadastro", "data_cadastro");
    }

    public void saveListDto(List<ItensComprasDTO> itensComprasDTOS, Compras compras) {
        for (ItensComprasDTO itensComprasDTO : itensComprasDTOS) {
            ItensCompras itensCompras = new ItensCompras();
            Mercadoria mercadoria = mercadoriaRepository.
                    findById(itensComprasDTO.getMercadoriaDTO().getId()).orElseThrow(()
                            -> new NotFoundException(
                            messageSource.getMessage("error.isEmpty", null, LocaleInteface.BR)
                    ));
            if (Objects.isNull(mercadoria.getSaldoEstoque())) {
                mercadoria.setSaldoEstoque(0.0);
            }
            mercadoria.setSaldoEstoque(mercadoria.getSaldoEstoque() + mercadoriaService.
                    calculoQuantidade(mercadoria.getUnidadeMedida(),
                    mercadoria.getMultiplicador(), itensComprasDTO.getQuantidade()));
            itensCompras.setMercadoria(mercadoria);
            itensCompras.setCompras(compras);
            itensCompras.setQuantidade(itensComprasDTO.getQuantidade());
            itensCompras.setQuantidadeFinal(mercadoriaService.
                    calculoQuantidade(mercadoria.getUnidadeMedida(),
                            mercadoria.getMultiplicador(), itensComprasDTO.getQuantidade()));
            itensCompras.setValorCompra(itensComprasDTO.getValorCompra());
            itensCompras.setValorUnitario((itensCompras.getValorCompra() * itensCompras.getQuantidade()) / itensCompras.getQuantidadeFinal());
            itensCompras.setData(new Date());
            mercadoriaRepository.save(mercadoria);
            itensCompraRepository.save(itensCompras);

        }
    }

    public Page<ItensComprasPageDTO> findAllMercadoriaComprasByIdMercadoria(Integer id, Filtro filtro) {
        if (id == null) {
            throw new NullPointerException(
                    messageSource.getMessage("error.object.isEmpty", null, LocaleInteface.BR));
        }
        Pageable pageable = paginationSimple.createPageableFromFiltro(filtro, CAMPO_ORDENACAO, "data");
        Page<ItensCompras> itensCompras = itensCompraRepository.findIngredienteById(id,pageable,filtro.getSearch());
        if (Objects.nonNull(itensCompras)) {
            return itensCompras.map(ItensComprasPageDTO::new);
        }
        return null;
    }

}
