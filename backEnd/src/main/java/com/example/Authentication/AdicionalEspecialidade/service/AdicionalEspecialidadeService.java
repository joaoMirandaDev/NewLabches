package com.example.Authentication.AdicionalEspecialidade.service;

import com.example.Authentication.AdicionalEspecialidade.DTO.AdicionalEspecialidadeDTO;
import com.example.Authentication.AdicionalEspecialidade.model.AdicionalEspecialidade;
import com.example.Authentication.AdicionalEspecialidade.repository.AdicionalEspecialidadeRepository;
import com.example.Authentication.Mercadoria.model.Mercadoria;
import com.example.Authentication.Mercadoria.service.MercadoriaService;
import com.example.Authentication.PedidoEspecialidade.model.PedidoEspecialidade;
import com.example.Authentication.Utils.Interfaces.LocaleInteface;
import com.example.Authentication.Utils.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AdicionalEspecialidadeService {

    private final AdicionalEspecialidadeRepository adicionalEspecialidadeRepository;
    private final MercadoriaService mercadoriaService;
    private final MessageSource messageSource;
    public void create(PedidoEspecialidade pedidoEspecialidade, AdicionalEspecialidadeDTO val) {
        Mercadoria mercadoria = mercadoriaService.findById(val.getMercadoria().getId());
        AdicionalEspecialidade adicionalEspecialidade = new AdicionalEspecialidade();
        adicionalEspecialidade.setMercadoria(mercadoria);
        adicionalEspecialidade.setQuantidade(val.getQuantidade());
        adicionalEspecialidade.setPedidoEspecialidade(pedidoEspecialidade);
        adicionalEspecialidadeRepository.save(adicionalEspecialidade);
        mercadoriaService.reduzSaldo(mercadoria, val.getQuantidade());
    }

    public void delete(AdicionalEspecialidade adicional) {
        if (Objects.nonNull(adicional)) {
            mercadoriaService.aumentaSaldo(adicional.getMercadoria(), adicional.getQuantidade());
            adicionalEspecialidadeRepository.delete(adicional);
        }
    }

    private AdicionalEspecialidade findById(Integer id) {
        return adicionalEspecialidadeRepository.findById(id).orElseThrow(() ->
                new NotFoundException(messageSource.getMessage("error.isEmpty", null, LocaleInteface.BR)));
    }
    public void update(AdicionalEspecialidadeDTO especialidadeDTO) {
        AdicionalEspecialidade especialidade = this.findById(especialidadeDTO.getId());
        especialidade.setMercadoria(mercadoriaService.findById(especialidadeDTO.getMercadoria().getId()));
        especialidade.setQuantidade(especialidadeDTO.getQuantidade());
        adicionalEspecialidadeRepository.save(especialidade);
    }
}
