package com.example.Authentication.Caixa.service;

import com.example.Authentication.Caixa.DTO.CaixaDTO;
import com.example.Authentication.Caixa.model.Caixa;
import com.example.Authentication.Caixa.repository.CaixaRepository;
import com.example.Authentication.Utils.filtro.Filtro;
import com.example.Authentication.Utils.pagination.Pagination;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CaixaService implements Pagination {

    private final CaixaRepository caixaRepository;
    private static final Map<String, String> CAMPO_ORDENACAO = new HashMap<>();
    static {
        CAMPO_ORDENACAO.put("numeroCaixa", "numero_caixa");
        CAMPO_ORDENACAO.put("dataAbertura", "data_abertura");
        CAMPO_ORDENACAO.put("valorAberturaCaixa", "valor_abertura_caixa");
        CAMPO_ORDENACAO.put("dataFechamento", "data_fechamento");
        CAMPO_ORDENACAO.put("valorFechamentoCaixa", "valor_fechamento_caixa");
    }

    @Override
    public Pageable createPageableFromFiltro(Filtro filtro, Map<String, String> CAMPO_MAP, String OrderInitial) {
        return Pagination.super.createPageableFromFiltro(filtro, CAMPO_MAP, OrderInitial);
    }

    public Page<CaixaDTO> findAllByPage(Filtro filtro) {
        Pageable pageable = this.createPageableFromFiltro(filtro, CAMPO_ORDENACAO, "numero_caixa");
        Page<Caixa> caixaPage = caixaRepository.findAll(pageable, filtro.getSearch());
        return caixaPage.map(CaixaDTO::new);
    }
}
