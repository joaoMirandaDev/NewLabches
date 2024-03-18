package com.example.Authentication.mercadoria.service;

import com.example.Authentication.Utils.filtro.Filtro;
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

import java.util.Date;
import java.util.Locale;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class MercadoriaService {

    private final MercadoriaRepository mercadoriaRepository;
    private final UnidadeMedidaRepository unidadeMedidaRepository;
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
        Mercadoria mercadoria = mercadoriaRepository.findById(mercadoriaDTO.getId()).orElseThrow(() ->
                new NotFoundException(messageSource.getMessage("error.isEmpty", null, locale)));
        if (Objects.nonNull(mercadoria)) {
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
    }

    private void deleteById(MercadoriaDTO mercadoriaDTO) {
        Mercadoria mercadoria = mercadoriaRepository.findById(mercadoriaDTO.getId()).orElseThrow(() ->
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

    public Page<Mercadoria> findAllByPage(Filtro filtro) {
        Pageable pageable = createPageableFromFiltro(filtro);
        return mercadoriaRepository.findAll(pageable, filtro.getSearch());
    }

    private Pageable createPageableFromFiltro(Filtro filtro) {
        if (Objects.isNull(filtro.getId())) {
            filtro.setId("nome");
            filtro.setDesc(true);
        }
        if (Objects.nonNull(filtro.getId())) {
            switch (filtro.getId()) {
                case "nome":
                    filtro.setId("nome");
                    break;
                case "unidadeMedida.nome":
                    filtro.setId("um.nome");
                    break;
                case "saldoEstoque":
                    filtro.setId("saldo_estoque");
                    break;
                case "valorVenda":
                    filtro.setId("valor_venda");
                    break;
                case "dataCadastro":
                    filtro.setId("data_cadastro");
                    break;
            }
        }
        Sort sort = filtro.isDesc() ? Sort.by(filtro.getId()).descending() : Sort.by(filtro.getId()).ascending();
        return PageRequest.of(filtro.getPagina(), filtro.getTamanhoPagina(), sort);
    }
}
