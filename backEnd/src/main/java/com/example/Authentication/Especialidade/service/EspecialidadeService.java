package com.example.Authentication.Especialidade.service;

import com.example.Authentication.Categoria.model.Categoria;
import com.example.Authentication.Categoria.repository.CategoriaRepository;
import com.example.Authentication.Especialidade.DTO.EspecialidadeDTO;
import com.example.Authentication.EspecialidadeMercadoria.service.EspecialidadeMercadoriaService;
import com.example.Authentication.Especialidade.model.Especialidade;
import com.example.Authentication.Especialidade.repository.EspecialidadeRepository;
import com.example.Authentication.Mercadoria.repository.MercadoriaRepository;
import com.example.Authentication.Utils.exceptions.NotFoundException;
import com.example.Authentication.Utils.filtro.Filtro;
import com.example.Authentication.Utils.pagination.Pagination;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class EspecialidadeService implements Pagination {

    private final MessageSource messageSource;
    Locale locale = new Locale("pt", "BR");
    private final EspecialidadeRepository especialidadeRepository;
    private final MercadoriaRepository mercadoriaRepository;
    private final CategoriaRepository categoriaRepository;
    private final EspecialidadeMercadoriaService especialidadeMercadoriaService;
    private static final Map<String, String > CAMPO_ORDENACAO = new HashMap<>();
    static {
        CAMPO_ORDENACAO.put("nome", "nome");
        CAMPO_ORDENACAO.put("categoria.nome", "c.nome");
        CAMPO_ORDENACAO.put("dataCadastro", "data_cadastro");
        CAMPO_ORDENACAO.put("preco", "preco");
    }

    @Transactional(rollbackFor = Exception.class)
    public void create(EspecialidadeDTO especialidadeDTO)  {
        Categoria categoria = categoriaRepository.findById(especialidadeDTO.getCategoria().getId()).orElseThrow(() ->
                new NotFoundException(messageSource.getMessage("error.isEmpty", null, locale)));
        Especialidade especialidade = new Especialidade();
        especialidade.setNome(especialidadeDTO.getNome());
        especialidade.setPreco(especialidadeDTO.getPreco());
        especialidade.setCategoria(categoria);
        especialidade.setData_cadastro(new Date());
        especialidade.setAtivo(especialidadeDTO.getAtivo());
        especialidadeDTO.getEspecialidadeMercadoria().forEach(value -> {
            especialidadeMercadoriaService.create(value,
                    especialidadeRepository.save(especialidade));
        });
    }

    @Override
    public Pageable createPageableFromFiltro(Filtro filtro, Map<String, String> CAMPO_MAP, String OrderInitial) {
        return Pagination.super.createPageableFromFiltro(filtro, CAMPO_MAP, OrderInitial);
    }

    public Page<EspecialidadeDTO> findAllProdutos(Filtro filtro) {
        Pageable pageable = this.createPageableFromFiltro(filtro, CAMPO_ORDENACAO, "nome");
        Page<Especialidade> produtosPage =  especialidadeRepository.findAll(pageable, filtro.getSearch());
        return produtosPage.map(EspecialidadeDTO::new);
    }

    public void deleteById(Integer id) {
        Especialidade especialidade = especialidadeRepository.findById(id).orElseThrow(() -> new NotFoundException(
                messageSource.getMessage("error.isEmpty", null, locale)
        ));
        if (Objects.nonNull(especialidade)) {
            especialidadeRepository.delete(especialidade);
        }
    }

    public Especialidade findById(Integer id) {
        Especialidade especialidade = especialidadeRepository.findById(id).orElseThrow(() -> new NotFoundException(
                messageSource.getMessage("error.isEmpty", null, locale)
        ));
        return especialidade;
    }

    public EspecialidadeDTO findByIdDto(Integer id) {
        return new EspecialidadeDTO(this.findById(id));
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
        especialidadeDTO.getEspecialidadeMercadoria().forEach(value -> {
        });
        especialidade.setData_cadastro(especialidadeDTO.getData_cadastro());
        especialidade.setAtivo(especialidadeDTO.getAtivo());
        especialidadeRepository.save(especialidade);
        especialidadeMercadoriaService.deleteAndCreateByEspecialidadeMercadoria(especialidadeDTO.getEspecialidadeMercadoria(), especialidade);

    }

}
