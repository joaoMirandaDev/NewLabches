package com.example.Authentication.Utils.pagination;

import com.example.Authentication.Fornecedores.DTO.FornecedorSelectDto;
import com.example.Authentication.Utils.filtro.Filtro;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class PaginationSimple {

    protected Pageable createPageableFromFiltro(Filtro filtro, Map<String, String> CAMPO_MAP, String OrderInitial) {
        if (Objects.isNull(filtro.getId())) {
            filtro.setId(OrderInitial);
            filtro.setDesc(true);
        }

        String campoInterno = CAMPO_MAP.getOrDefault(filtro.getId(), filtro.getId());
        Sort sort = filtro.isDesc() ? Sort.by(campoInterno).descending() : Sort.by(campoInterno).ascending();
        return PageRequest.of(filtro.getPagina(), filtro.getTamanhoPagina(), sort);
    }
}
