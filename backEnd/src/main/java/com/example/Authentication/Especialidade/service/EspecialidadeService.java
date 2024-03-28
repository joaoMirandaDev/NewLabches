package com.example.Authentication.Especialidade.service;

import com.example.Authentication.Categoria.model.Categoria;
import com.example.Authentication.Categoria.repository.CategoriaRepository;
import com.example.Authentication.Especialidade.DTO.EspecialidadeDTO;
import com.example.Authentication.RelEspecialidade.service.RelEspecialidadeMercadoriaService;
import com.example.Authentication.Especialidade.model.Especialidade;
import com.example.Authentication.Especialidade.repository.EspecialidadeRepository;
import com.example.Authentication.Mercadoria.model.Mercadoria;
import com.example.Authentication.Mercadoria.repository.MercadoriaRepository;
import com.example.Authentication.Utils.exceptions.NotFoundException;
import com.example.Authentication.Utils.filtro.Filtro;
import com.example.Authentication.Utils.pagination.PaginationSimple;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class EspecialidadeService extends PaginationSimple {

    private final MessageSource messageSource;
    Locale locale = new Locale("pt", "BR");
    private final EspecialidadeRepository especialidadeRepository;
    private final MercadoriaRepository mercadoriaRepository;
    private final CategoriaRepository categoriaRepository;
    private final RelEspecialidadeMercadoriaService relEspecialidadeMercadoriaService;
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
        Pageable pageable = createPageableFromFiltro(filtro, CAMPO_ORDENACAO, "nome");
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
