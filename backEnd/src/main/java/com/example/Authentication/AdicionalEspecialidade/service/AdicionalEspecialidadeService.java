package com.example.Authentication.AdicionalEspecialidade.service;

import com.example.Authentication.AdicionalEspecialidade.DTO.AdicionalEspecialidadeDTO;
import com.example.Authentication.AdicionalEspecialidade.model.AdicionalEspecialidade;
import com.example.Authentication.AdicionalEspecialidade.repository.AdicionalEspecialidadeRepository;
import com.example.Authentication.Mercadoria.model.Mercadoria;
import com.example.Authentication.Mercadoria.service.MercadoriaService;
import com.example.Authentication.PedidoEspecialidade.model.PedidoEspecialidade;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdicionalEspecialidadeService {

    private final AdicionalEspecialidadeRepository adicionalEspecialidadeRepository;
    private final MercadoriaService mercadoriaService;
    public void create(PedidoEspecialidade pedidoEspecialidade, AdicionalEspecialidadeDTO val) {
        Mercadoria mercadoria = mercadoriaService.findById(val.getMercadoria().getId());
        AdicionalEspecialidade adicionalEspecialidade = new AdicionalEspecialidade();
        adicionalEspecialidade.setMercadoria(mercadoria);
        adicionalEspecialidade.setQuantidade(val.getQuantidade());
        adicionalEspecialidade.setPedidoEspecialidade(pedidoEspecialidade);
        adicionalEspecialidadeRepository.save(adicionalEspecialidade);
        mercadoriaService.reduzSaldo(mercadoria, val.getQuantidade());
    }

}
