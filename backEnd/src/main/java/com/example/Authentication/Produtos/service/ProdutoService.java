package com.example.Authentication.Produtos.service;

import com.example.Authentication.Categoria.DTO.CategoriaDTO;
import com.example.Authentication.Categoria.model.Categoria;
import com.example.Authentication.Categoria.repository.CategoriaRepository;
import com.example.Authentication.Produtos.DTO.ProdutosDTO;
import com.example.Authentication.Produtos.model.Produtos;
import com.example.Authentication.Produtos.repository.ProdutoRepository;
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

import java.util.Date;
import java.text.NumberFormat;
import java.util.Locale;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final MessageSource messageSource;
    Locale locale = new Locale("pt", "BR");
    @Autowired
    private final ProdutoRepository produtoRepository;

    private final CategoriaRepository categoriaRepository;

    @Transactional(rollbackFor = Exception.class)
    public void create(ProdutosDTO produtosDTO)  {
        Categoria categoria = categoriaRepository.findById(produtosDTO.getCategoria().getId()).orElseThrow(() ->
                new NotFoundException(messageSource.getMessage("error.isEmpty", null, locale)));
        Produtos produtos = new Produtos();
        produtos.setNome(produtosDTO.getNome());
        produtos.setPreco(produtosDTO.getPreco());
        produtos.setCategoria(categoria);
//        produtos.setIngrediente(produtosDTO.getIngrediente());
        produtos.setData_cadastro(new Date());
        produtos.setAtivo(produtosDTO.getAtivo());
        produtoRepository.save(produtos);

    }

    public Page<ProdutosDTO> findAllProdutos(Filtro filtro) {
        Pageable pageable = createPageableFromFiltro(filtro);
        Page<Produtos> produtosPage =  produtoRepository.findAll(pageable, filtro.getSearch());
        return produtosPage.map(ProdutosDTO::new);
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
        Produtos produtos = produtoRepository.findById(id).orElseThrow(() -> new NotFoundException(
                messageSource.getMessage("error.isEmpty", null, locale)
        ));
        if (Objects.nonNull(produtos)) {
            produtoRepository.delete(produtos);
        }
    }

    public ProdutosDTO findById(Integer id) {
        Produtos produtos = produtoRepository.findById(id).orElseThrow(() -> new NotFoundException(
                messageSource.getMessage("error.isEmpty", null, locale)
        ));
        if (Objects.nonNull(produtos)) {
           return new ProdutosDTO(produtos);
        }
        return null;
    }

    public void editarById(ProdutosDTO produtosDTO)  {
        Produtos produtos = produtoRepository.findById(produtosDTO.getId()).orElseThrow(() -> new NotFoundException(
                messageSource.getMessage("error.isEmpty", null, locale)
        ));
        Categoria categoria = categoriaRepository.findById(produtosDTO.getCategoria().getId()).orElseThrow(() ->
                new NotFoundException(messageSource.getMessage("error.isEmpty", null, locale)));
        produtos.setNome(produtosDTO.getNome());
        produtos.setCategoria(categoria);
        produtos.setPreco(produtosDTO.getPreco());
//        produtos.setIngrediente(produtosDTO.getIngrediente());
        produtos.setData_cadastro(produtosDTO.getData_cadastro());
        produtos.setAtivo(produtosDTO.getAtivo());
        produtoRepository.save(produtos);

    }
}
