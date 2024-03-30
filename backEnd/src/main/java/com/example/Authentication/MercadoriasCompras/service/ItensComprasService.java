package com.example.Authentication.MercadoriasCompras.service;

import com.example.Authentication.Compras.model.Compras;
import com.example.Authentication.Compras.repository.ComprasRepository;
import com.example.Authentication.Compras.service.ComprasService;
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
public class ItensComprasService extends PaginationSimple {

    private final MessageSource messageSource;

    private final MercadoriaRepository mercadoriaRepository;
    private final MercadoriaService mercadoriaService;
    private final ComprasRepository comprasRepository;
    private final ItensCompraRepository itensCompraRepository;
    private static final Map<String, String> CAMPO_ORDENACAO = new HashMap<>();

    static {
        CAMPO_ORDENACAO.put("quantidade", "quantidade");
        CAMPO_ORDENACAO.put("valorFinalUnitario", "valor_final_unitario");
        CAMPO_ORDENACAO.put("valorCompra", "valor_compra");
        CAMPO_ORDENACAO.put("quantidadeFinal", "quantidade_final");
        CAMPO_ORDENACAO.put("dataCadastro", "data_cadastro");
    }

    public void saveListDto(List<ItensComprasDTO> itensComprasDTOS, Compras compras) {
        for (ItensComprasDTO itensComprasDTO : itensComprasDTOS) {
            ItensCompras itensCompras = new ItensCompras();
            Mercadoria mercadoria = mercadoriaRepository.
                    findById(itensComprasDTO.getMercadoria().getId()).orElseThrow(()
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
            itensCompras.setValorUnitario(itensCompras.getValorCompra() / itensCompras.getQuantidadeFinal());
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
        Pageable pageable = createPageableFromFiltro(filtro, CAMPO_ORDENACAO, "data");
        Page<ItensCompras> itensCompras = itensCompraRepository.findIngredienteById(id,pageable,filtro.getSearch());
        if (Objects.nonNull(itensCompras)) {
            return itensCompras.map(ItensComprasPageDTO::new);
        }
        return null;
    }

    public void delete(ItensCompras id) {
        itensCompraRepository.delete(id);
    }

    public void saveAndEdit(List<ItensComprasDTO> itensComprasDTOS, Compras compras) {
        List<ItensComprasDTO> newList = new ArrayList<>();
        List<ItensCompras> itensCompras = itensCompraRepository.findAllRegistroCompraById(compras.getId());
        /**
         *  Este trecho verifica o item no banco e na listagem, caso exista em ambos irá atualizar os dados
         *  Caso nao exista na nova listagem ira deletar o dados existente no banco
         *  **/
        for (ItensCompras banco :itensCompras) {
            Mercadoria mercadoria = mercadoriaRepository.
                    findById(banco.getMercadoria().getId()).orElseThrow(()
                            -> new NotFoundException(
                            messageSource.getMessage("error.isEmpty", null, LocaleInteface.BR)
                    ));
            boolean encontrado = false;
            for (ItensComprasDTO itensComprasDTO : itensComprasDTOS) {
                if (banco.getMercadoria().getId().equals(itensComprasDTO.getMercadoria().getId())) {
                    encontrado = true;
                    mercadoria.setSaldoEstoque((mercadoria.getSaldoEstoque() - banco.getQuantidadeFinal()) + mercadoriaService.
                            calculoQuantidade(mercadoria.getUnidadeMedida(),
                                    mercadoria.getMultiplicador(), itensComprasDTO.getQuantidade()));
                    banco.setQuantidade(itensComprasDTO.getQuantidade());
                    banco.setQuantidadeFinal(mercadoriaService.
                            calculoQuantidade(banco.getMercadoria().getUnidadeMedida(),
                                    banco.getMercadoria().getMultiplicador(), itensComprasDTO.getQuantidade()));
                    banco.setValorCompra(itensComprasDTO.getValorCompra());
                    banco.setValorUnitario(banco.getValorCompra() / banco.getQuantidadeFinal());
                    itensCompraRepository.save(banco);
                }
            }
            if (!encontrado) {
                mercadoria.setSaldoEstoque(mercadoria.getSaldoEstoque() - banco.getQuantidadeFinal());
                this.delete(banco);
            }
            mercadoriaRepository.save(mercadoria);
        }
        /**
         *  Este trecho verifica o item no banco e na listagem, caso não exista irá criar um novo
         **/
        for (ItensComprasDTO itensComprasDTO : itensComprasDTOS) {
            boolean encontrado = false;
            for (ItensCompras itens : itensCompras) {
                if (itensComprasDTO.getMercadoria().getId().equals(itens.getMercadoria().getId())) {
                    encontrado = true;
                    break;
                }
            }
            if (!encontrado) {
                newList.add(itensComprasDTO);
            }
        }
        if (newList.size() > 0) {
            this.saveListDto(newList, compras);
        }
    }


}
