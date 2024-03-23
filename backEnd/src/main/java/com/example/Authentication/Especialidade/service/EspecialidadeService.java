package com.example.Authentication.Especialidade.service;

import com.example.Authentication.Categoria.model.Categoria;
import com.example.Authentication.Categoria.repository.CategoriaRepository;
import com.example.Authentication.Especialidade.DTO.EspecialidadeDTO;
import com.example.Authentication.Especialidade.Rel.model.RelEspecialidadeMercadoria;
import com.example.Authentication.Especialidade.Rel.repository.RelEspecialidadeMercadoriaRepository;
import com.example.Authentication.Especialidade.Rel.service.RelEspecialidadeMercadoriaService;
import com.example.Authentication.Especialidade.model.Especialidade;
import com.example.Authentication.Especialidade.repository.EspecialidadeRepository;
import com.example.Authentication.Mercadoria.model.Mercadoria;
import com.example.Authentication.Mercadoria.repository.MercadoriaRepository;
import com.example.Authentication.Utils.exceptions.NotFoundException;
import com.example.Authentication.Utils.filtro.Filtro;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class EspecialidadeService {

    private final MessageSource messageSource;
    Locale locale = new Locale("pt", "BR");
    private final EspecialidadeRepository especialidadeRepository;
    private final MercadoriaRepository mercadoriaRepository;
    private final CategoriaRepository categoriaRepository;
    private final RelEspecialidadeMercadoriaService relEspecialidadeMercadoriaService;

    @Transactional(rollbackFor = Exception.class)
    public void create(EspecialidadeDTO especialidadeDTO)  {
        Categoria categoria = categoriaRepository.findById(especialidadeDTO.getCategoria().getId()).orElseThrow(() ->
                new NotFoundException(messageSource.getMessage("error.isEmpty", null, locale)));
        Especialidade especialidade = new Especialidade();
        especialidade.setNome(especialidadeDTO.getNome());
        especialidade.setPreco(especialidadeDTO.getPreco());
        especialidade.setCategoria(categoria);
        List<Mercadoria> mercadoriaList = new ArrayList<>();
        especialidadeDTO.getIdMercadoria().forEach(merc -> {
            if (Objects.nonNull(merc)) {
                mercadoriaList.add(mercadoriaRepository.findById(merc).orElseThrow(() ->
                        new NotFoundException(messageSource.getMessage("error.isEmpty", null, locale))));
            }
        });
        especialidade.setMercadorias(mercadoriaList);
        especialidade.setData_cadastro(new Date());
        especialidade.setAtivo(especialidadeDTO.getAtivo());
        especialidadeRepository.save(especialidade);

    }

    public Page<EspecialidadeDTO> findAllProdutos(Filtro filtro) {
        Pageable pageable = createPageableFromFiltro(filtro);
        Page<Especialidade> produtosPage =  especialidadeRepository.findAll(pageable, filtro.getSearch());
        return produtosPage.map(EspecialidadeDTO::new);
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
                case "categoria.nome":
                    filtro.setId("c.nome");
                    break;
                case "dataCadastro":
                    filtro.setId("data_cadastro");
                    break;
                case "preco":
                    filtro.setId("preco");
                    break;
            }
        }
        Sort sort = filtro.isDesc() ? Sort.by(filtro.getId()).descending() : Sort.by(filtro.getId()).ascending();
        return PageRequest.of(filtro.getPagina(), filtro.getTamanhoPagina(), sort);
    }

    public void deleteById(Integer id) {
        Especialidade especialidade = especialidadeRepository.findById(id).orElseThrow(() -> new NotFoundException(
                messageSource.getMessage("error.isEmpty", null, locale)
        ));
        if (Objects.nonNull(especialidade)) {
            especialidadeRepository.delete(especialidade);
        }
    }

    public EspecialidadeDTO findById(Integer id) {
        Especialidade especialidade = especialidadeRepository.findById(id).orElseThrow(() -> new NotFoundException(
                messageSource.getMessage("error.isEmpty", null, locale)
        ));
        if (Objects.nonNull(especialidade)) {
           return new EspecialidadeDTO(especialidade);
        }
        return null;
    }

    public void editarById(EspecialidadeDTO especialidadeDTO)  {
        Especialidade especialidade = especialidadeRepository.findById(especialidadeDTO.getId()).orElseThrow(() -> new NotFoundException(
                messageSource.getMessage("error.isEmpty", null, locale)
        ));
        Categoria categoria = categoriaRepository.findById(especialidadeDTO.getCategoria().getId()).orElseThrow(() ->
                new NotFoundException(messageSource.getMessage("error.isEmpty", null, locale)));
        especialidade.setNome(especialidadeDTO.getNome());
        especialidade.setCategoria(categoria);
        especialidade.setPreco(especialidadeDTO.getPreco());
        relEspecialidadeMercadoriaService.deleteAndCreateByEspecialidadeMercadoria(especialidade, especialidadeDTO.getIdMercadoria());
        especialidade.setData_cadastro(especialidadeDTO.getData_cadastro());
        especialidade.setAtivo(especialidadeDTO.getAtivo());
        especialidadeRepository.save(especialidade);

    }

}
