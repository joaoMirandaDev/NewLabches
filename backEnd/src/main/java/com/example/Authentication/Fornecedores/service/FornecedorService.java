package com.example.Authentication.Fornecedores.service;

import com.example.Authentication.Fornecedores.DTO.FornecedorDto;
import com.example.Authentication.Fornecedores.DTO.FornecedorListagemDto;
import com.example.Authentication.Utils.exceptions.NotFoundException;
import com.example.Authentication.Utils.filtro.Filtro;
import com.example.Authentication.Fornecedores.model.Fornecedor;
import com.example.Authentication.Fornecedores.repository.FornecedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Locale;
import java.util.Objects;

@Service
public class FornecedorService {

    private final MessageSource messageSource;

    Locale locale = new Locale("pt", "BR");
    @Autowired
    private static FornecedorRepository fornecedorRepository;

    @Autowired
    public FornecedorService(MessageSource messageSource, FornecedorRepository fornecedorRepository) {
        this.messageSource = messageSource;
        FornecedorService.fornecedorRepository = fornecedorRepository;
    }
    @Transactional(rollbackFor = Exception.class)
    public void adicionarfornecedor(FornecedorDto fornecedorDto) throws Exception {
        try {
            Fornecedor fornecedor = new Fornecedor();
            if (fornecedorDto.getCpfCnpj().length() == 11) {
                fornecedor.setNomeRazaoSocial(fornecedorDto.getNomeRazaoSocial());
//                fornecedor.setDataNascimento(fornecedorDto.getDataNascimento());
                fornecedor.setSobrenome(fornecedorDto.getSobrenome());
                fornecedor.setCpfCnpj(fornecedorDto.getCpfCnpj());
                fornecedor.setRg(fornecedorDto.getRg());
                fornecedor.setNumero(fornecedorDto.getNumero());
                fornecedor.setCep(fornecedorDto.getCep());
                fornecedor.setRua(fornecedorDto.getRua());
                fornecedor.setBairro(fornecedorDto.getBairro());
                fornecedor.setAtivo(0);
                fornecedor.setCidade(fornecedorDto.getCidade());
                fornecedor.setEstado(fornecedorDto.getEstado());
                fornecedor.setTelefone(fornecedorDto.getTelefone());

            } else {
                fornecedor.setNomeRazaoSocial(fornecedorDto.getNomeRazaoSocial());
//                fornecedor.setDataNascimento(fornecedorDto.getDataNascimento());
                fornecedor.setNomeFantasia(fornecedorDto.getNomeFantasia());
                fornecedor.setCpfCnpj(fornecedorDto.getCpfCnpj());
                fornecedor.setNumero(fornecedorDto.getNumero());
                fornecedor.setCep(fornecedorDto.getCep());
                fornecedor.setRua(fornecedorDto.getRua());
                fornecedor.setBairro(fornecedorDto.getBairro());
                fornecedor.setAtivo(0);
                fornecedor.setCidade(fornecedorDto.getCidade());
                fornecedor.setEstado(fornecedorDto.getEstado());
                fornecedor.setTelefone(fornecedorDto.getTelefone());
                fornecedor.setEmail(fornecedorDto.getEmail());
            }
            fornecedorRepository.save(fornecedor);
        } catch (DataAccessException e) {
            throw new Exception(messageSource.getMessage("exception.fornecedor.salvar", null, locale),e);
        }
    }

    public Fornecedor findById(Short id) {
        return fornecedorRepository.findById(id).orElseThrow(() -> new NotFoundException(
                messageSource.getMessage("error.find", null, locale)
        ));
    }


    public ResponseEntity<String> deleteById(Short id) {
        fornecedorRepository.deleteById(id);
        return ResponseEntity.ok(messageSource.getMessage("success.delete", null, locale));
    }

    public Page<FornecedorListagemDto> findAllfornecedor(Filtro filtro) {
        Pageable pageable = createPageableFromFiltro(filtro);
        Page<Fornecedor> fornecedor =  fornecedorRepository.findAll(pageable, filtro.getSearch());
        return fornecedor.map(FornecedorListagemDto::new);
    }
    private Pageable createPageableFromFiltro(Filtro filtro) {
        if (Objects.isNull(filtro.getId())) {
            filtro.setId("nome_razao_social");
            filtro.setDesc(true);
        }
        if (Objects.nonNull(filtro.getId())) {
            switch (filtro.getId()) {
                case "nomeRazaoSocial":
                    filtro.setId("nome_razao_social");
                    break;
                case "cpfCnpj":
                    filtro.setId("cpf_cnpj");
                    break;
            }
        }
        Sort sort = filtro.isDesc() ? Sort.by(filtro.getId()).descending() : Sort.by(filtro.getId()).ascending();
        return PageRequest.of(filtro.getPagina(), filtro.getTamanhoPagina(), sort);
    }

    public void editarFornecedor(FornecedorDto fornecedorDto) throws Exception {
        try {
            Fornecedor fornecedor = fornecedorRepository.findById(fornecedorDto.getId()).orElseThrow(() -> new NotFoundException(
                    messageSource.getMessage("exception.fornecedor", null, locale)
            ));
            if (fornecedorDto.getCpfCnpj().length() == 11) {
                fornecedor.setNomeRazaoSocial(fornecedorDto.getNomeRazaoSocial());
//                fornecedor.setDataNascimento(fornecedorDto.getDataNascimento());
                fornecedor.setSobrenome(fornecedorDto.getSobrenome());
                fornecedor.setCpfCnpj(fornecedorDto.getCpfCnpj());
                fornecedor.setRg(fornecedorDto.getRg());
                fornecedor.setNumero(fornecedorDto.getNumero());
                fornecedor.setCep(fornecedorDto.getCep());
                fornecedor.setRua(fornecedorDto.getRua());
                fornecedor.setBairro(fornecedorDto.getBairro());
                fornecedor.setAtivo(0);
                fornecedor.setCidade(fornecedorDto.getCidade());
                fornecedor.setEstado(fornecedorDto.getEstado());
                fornecedor.setTelefone(fornecedorDto.getTelefone());

            } else {
                fornecedor.setNomeRazaoSocial(fornecedorDto.getNomeRazaoSocial());
//                fornecedor.setDataNascimento(fornecedorDto.getDataNascimento());
                fornecedor.setNomeFantasia(fornecedorDto.getNomeFantasia());
                fornecedor.setCpfCnpj(fornecedorDto.getCpfCnpj());
                fornecedor.setNumero(fornecedorDto.getNumero());
                fornecedor.setCep(fornecedorDto.getCep());
                fornecedor.setRua(fornecedorDto.getRua());
                fornecedor.setBairro(fornecedorDto.getBairro());
                fornecedor.setAtivo(0);
                fornecedor.setCidade(fornecedorDto.getCidade());
                fornecedor.setEstado(fornecedorDto.getEstado());
                fornecedor.setTelefone(fornecedorDto.getTelefone());
                fornecedor.setEmail(fornecedorDto.getEmail());
            }
            fornecedorRepository.save(fornecedor);
        } catch (DataAccessException e) {
            throw new Exception(messageSource.getMessage("exception.fornecedorFisica.salvar", null, locale),e);
        }
    }

}
