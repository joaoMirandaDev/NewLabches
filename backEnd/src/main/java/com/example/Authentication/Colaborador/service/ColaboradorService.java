package com.example.Authentication.Colaborador.service;

import com.example.Authentication.Role.model.Role;
import com.example.Authentication.Utils.exceptions.NotFoundException;
import com.example.Authentication.Utils.filtro.Filtro;
import com.example.Authentication.Colaborador.DTO.ColaboradorDto;
import com.example.Authentication.Colaborador.model.Colaborador;
import com.example.Authentication.Colaborador.repository.ColaboradorRepository;
import com.example.Authentication.Usuario.model.Usuario;
import com.example.Authentication.Role.repository.RoleRepository;
import com.example.Authentication.Usuario.repository.UsuarioRepository;
import com.example.Authentication.Utils.pagination.Pagination;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ColaboradorService {


    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final MessageSource messageSource;
    private final RoleRepository roleRepository;
    Locale locale = new Locale("pt", "BR");
    private final ColaboradorRepository colaboradorRepository;
    private static final Map<String, String> CAMPO_ORDENACAO = new HashMap<>();
    static {
        CAMPO_ORDENACAO.put("nome", "nome");
        CAMPO_ORDENACAO.put("cpf", "cpf");
        CAMPO_ORDENACAO.put("telefone", "telefone");
    }

    @Transactional(rollbackFor = Exception.class)
    public void adicionarPessoa(ColaboradorDto colaboradorDto) throws Exception {
        try {
            Colaborador colaborador = new Colaborador();
            colaborador.setNome(colaboradorDto.getNome());
            colaborador.setSobrenome(colaboradorDto.getSobrenome());
            colaborador.setCpf(colaboradorDto.getCpf());
            colaborador.setRg(colaboradorDto.getRg());
            colaborador.setNumero(colaboradorDto.getNumero());
            colaborador.setCep(colaboradorDto.getCep());
            colaborador.setRua(colaboradorDto.getRua());
            colaborador.setBairro(colaboradorDto.getBairro());
            colaborador.setCidade(colaboradorDto.getCidade());
            colaborador.setEstado(colaboradorDto.getEstado());
            colaborador.setTelefone(colaboradorDto.getTelefone());
            colaboradorRepository.save(colaborador);
            String senhaCripto = passwordEncoder.encode(colaboradorDto.getSenha());
            Usuario usuario = new Usuario();
            usuario.setLogin(colaboradorDto.getCpf());
            Role role = roleRepository.findById(colaboradorDto.getRole()).orElseThrow(() -> new NotFoundException(
                    messageSource.getMessage("error.isEmpty", null, locale)
            ));
            usuario.setRole(role);
            usuario.setSenha(senhaCripto);
            usuario.setColaborador(colaborador);
            usuarioRepository.save(usuario);
        } catch (DataAccessException e) {
            throw new Exception(messageSource.getMessage("error.save", null, locale),e);
        }
    }

    public ColaboradorDto findById(Short id) {
        Colaborador colaborador =  colaboradorRepository.findById(id).orElseThrow(() -> new NotFoundException(
                messageSource.getMessage("error.isEmpty", null, locale)
        ));
        return new ColaboradorDto(colaborador);
    }


    public ResponseEntity<String> deleteById(Short id) {
        colaboradorRepository.deleteById(id);
        return ResponseEntity.ok(messageSource.getMessage("success.delete", null, locale));
    }

    public Page<Colaborador> findAllPessoa(Filtro filtro) {
        Pageable pageable = Pagination.createPageableFromFiltro(filtro, CAMPO_ORDENACAO, "nome");
        return colaboradorRepository.findAll(pageable, filtro.getSearch());
    }

    public void editar(ColaboradorDto colaboradorDto) throws Exception {
        try {
            Colaborador colaborador = colaboradorRepository.findById(colaboradorDto.getId()).orElseThrow(() -> new NotFoundException(
                    messageSource.getMessage("error.find", null, locale)
            ));
                colaborador.setNome(colaboradorDto.getNome());
                colaborador.setSobrenome(colaboradorDto.getSobrenome());
                colaborador.setCpf(colaboradorDto.getCpf());
                colaborador.setRg(colaboradorDto.getRg());
                colaborador.setNumero(colaboradorDto.getNumero());
                colaborador.setCep(colaboradorDto.getCep());
                colaborador.setRua(colaboradorDto.getRua());
                colaborador.setBairro(colaboradorDto.getBairro());
                colaborador.setCidade(colaboradorDto.getCidade());
                colaborador.setEstado(colaboradorDto.getEstado());
                colaborador.setTelefone(colaboradorDto.getTelefone());
                colaboradorRepository.save(colaborador);

            if (Objects.nonNull(colaboradorDto.getSenha()) && !colaboradorDto.getSenha().isEmpty()) {
                Usuario usuario = usuarioRepository.findByLogin(colaboradorDto.getCpf());
                String senhaCripto = passwordEncoder.encode(colaboradorDto.getSenha());
                usuario.setSenha(senhaCripto);
                usuarioRepository.save(usuario);
            }
        } catch (DataAccessException e) {
            throw new Exception(messageSource.getMessage("error.save", null, locale),e);
        }
    }

    public ColaboradorDto findByCpfCnpj(String cpf) {
        Colaborador colaborador = colaboradorRepository.findByCpf(cpf);
        return new ColaboradorDto(colaborador.getNome());
    }
}
