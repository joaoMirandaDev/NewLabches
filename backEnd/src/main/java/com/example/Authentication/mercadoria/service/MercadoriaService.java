package com.example.Authentication.mercadoria.service;

import com.example.Authentication.Utils.filtro.Filtro;
import com.example.Authentication.Utils.pagination.PaginationSimple;
import com.example.Authentication.mercadoria.DTO.MercadoriaDTO;
import com.example.Authentication.mercadoria.Interface.UnidadeMedidaInterface;
import com.example.Authentication.mercadoria.model.Mercadoria;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import com.example.Authentication.mercadoria.repository.MercadoriaRepository;
import com.example.Authentication.UnidadeMedida.model.UnidadeMedida;
import com.example.Authentication.UnidadeMedida.repository.UnidadeMedidaRepository;
import com.example.Authentication.Utils.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class MercadoriaService {

    private final MercadoriaRepository mercadoriaRepository;
    private final UnidadeMedidaRepository unidadeMedidaRepository;
    private final PaginationSimple paginationSimple;
    private static final Map<String, String> CAMPO_ORDENACAO = new HashMap<>();
    private final MessageSource messageSource;
    Locale locale = new Locale("pt", "BR");

    public void cadastro(MercadoriaDTO mercadoriaDTO) {
        UnidadeMedida unidadeMedida = unidadeMedidaRepository.findById(mercadoriaDTO.getUnidadeMedida().getId()).orElseThrow(() ->
                new NotFoundException(messageSource.getMessage("error.isEmpty", null, locale)));
        if (Objects.isNull(mercadoriaDTO.getNome()) || mercadoriaDTO.getNome() == "") {
            throw new IllegalArgumentException(messageSource.getMessage("error.object.isEmpty", null, locale)
            );
        }
        Mercadoria mercadoriaRepositoryByNome = mercadoriaRepository.findByNome(mercadoriaDTO.getNome());
        if (Objects.nonNull(mercadoriaRepositoryByNome)) {
            throw new DuplicateKeyException(messageSource.getMessage("error.object.exist", null, locale));
        }
        Mercadoria mercadoria = new Mercadoria();
        mercadoria.setNome(mercadoriaDTO.getNome());
        mercadoria.setUnidadeMedida(unidadeMedida);
        mercadoria.setSaldoEstoque(0.0);
        mercadoria.setValorVenda(mercadoriaDTO.getValorVenda());
        mercadoria.setAtivo(0);
        mercadoria.setDataCadastro(new Date());
        mercadoria.setMultiplicador(mercadoriaDTO.getMultiplicador());
        mercadoriaRepository.save(mercadoria);
    }

    public void editar(MercadoriaDTO mercadoriaDTO) {
        Mercadoria mercadoriaRepositoryByNome = mercadoriaRepository.findByNome(mercadoriaDTO.getNome());
        if (Objects.nonNull(mercadoriaRepositoryByNome) && !mercadoriaDTO.getId().equals(mercadoriaRepositoryByNome.getId())) {
            throw new DuplicateKeyException(messageSource.getMessage("error.object.exist", null, locale));
        }
        Mercadoria mercadoria = mercadoriaRepository.findById(mercadoriaDTO.getId()).orElseThrow(() ->
                new NotFoundException(messageSource.getMessage("error.isEmpty", null, locale)));
        UnidadeMedida unidadeMedida = unidadeMedidaRepository.findById(mercadoriaDTO.getUnidadeMedida().getId()).orElseThrow(() ->
                new NotFoundException(messageSource.getMessage("error.isEmpty", null, locale)));
        mercadoria.setUnidadeMedida(unidadeMedida);
        mercadoria.setNome(mercadoriaDTO.getNome());
        mercadoria.setValorVenda(mercadoriaDTO.getValorVenda());
        mercadoria.setSaldoEstoque(mercadoriaDTO.getSaldoEstoque());
        mercadoria.setMultiplicador(mercadoriaDTO.getMultiplicador());
        mercadoria.setAtivo(mercadoriaDTO.getAtivo());
        mercadoriaRepository.save(mercadoria);

    }

    public void deleteById(Integer id) {
        Mercadoria mercadoria = mercadoriaRepository.findById(id).orElseThrow(() ->
                new NotFoundException(messageSource.getMessage("error.isEmpty", null, locale)));
        if (Objects.nonNull(mercadoria)) {
            mercadoriaRepository.delete(mercadoria);
        }
    }

    public Double calculoQuantidade(UnidadeMedida unidadeMedida,Double multiplicador, Double quantidadeCompra) {
        Double valorQuantidade = null;
        switch (unidadeMedida.getNome()) {
            case UnidadeMedidaInterface.KG:
              Double valorTotal = UnidadeMedidaInterface.valorKG * quantidadeCompra;
              valorQuantidade = valorTotal / multiplicador;
                break;
            case UnidadeMedidaInterface.UN, UnidadeMedidaInterface.PC:
                valorQuantidade = multiplicador * quantidadeCompra ;
                break;
        }
        return valorQuantidade;
    }


   static {
        CAMPO_ORDENACAO.put("nome", "nome");
        CAMPO_ORDENACAO.put("unidadeMedida.nome", "um.nome");
        CAMPO_ORDENACAO.put("saldoEstoque", "saldo_estoque");
        CAMPO_ORDENACAO.put("valorVenda", "valor_venda");
        CAMPO_ORDENACAO.put("dataCadastro", "data_cadastro");
    }
    public Page<Mercadoria> findAllByPage(Filtro filtro) {
        Pageable pageable = paginationSimple.createPageableFromFiltro(filtro, CAMPO_ORDENACAO, "nome");
        return mercadoriaRepository.findAll(pageable, filtro.getSearch());
    }


    public Mercadoria findById(Integer id) {
        return mercadoriaRepository.findById(id).orElseThrow(() -> new
                NotFoundException(messageSource.getMessage("error.isEmpty", null, locale)));
    }
}
