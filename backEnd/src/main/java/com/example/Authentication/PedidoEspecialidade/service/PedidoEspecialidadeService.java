package com.example.Authentication.PedidoEspecialidade.service;

import com.example.Authentication.AdicionalEspecialidade.DTO.AdicionalEspecialidadeDTO;
import com.example.Authentication.AdicionalEspecialidade.model.AdicionalEspecialidade;
import com.example.Authentication.AdicionalEspecialidade.service.AdicionalEspecialidadeService;
import com.example.Authentication.Especialidade.model.Especialidade;
import com.example.Authentication.Especialidade.service.EspecialidadeService;
import com.example.Authentication.Mercadoria.repository.MercadoriaRepository;
import com.example.Authentication.Mercadoria.service.MercadoriaService;
import com.example.Authentication.Pedido.model.Pedido;
import com.example.Authentication.PedidoEspecialidade.DTO.PedidoEspecialidadeDTO;
import com.example.Authentication.PedidoEspecialidade.model.PedidoEspecialidade;
import com.example.Authentication.PedidoEspecialidade.repository.PedidoEspecialidadeRepository;
import com.example.Authentication.Utils.Interfaces.LocaleInteface;
import com.example.Authentication.Utils.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PedidoEspecialidadeService {
    private final PedidoEspecialidadeRepository pedidoEspecialidadeRepository;
    private final MercadoriaService mercadoriaService;
    private final MessageSource messageSource;
    private final EspecialidadeService especialidadeService;
    private final AdicionalEspecialidadeService adicionalEspecialidadeService;

    public void create(PedidoEspecialidadeDTO val, Pedido pedido) {
        PedidoEspecialidade pedidoEspecialidade = new PedidoEspecialidade();
        pedidoEspecialidade.setEspecialidade(especialidadeService.findById(val.getEspecialidade().getId()));
        pedidoEspecialidade.setPedido(pedido);
        pedidoEspecialidade.setQuantidade(val.getQuantidade());
        pedidoEspecialidade.setValor(val.getValor());
        pedidoEspecialidadeRepository.save(pedidoEspecialidade);
        if (Objects.nonNull(val.getAdicionalEspecialidades()) && !val.getAdicionalEspecialidades().isEmpty()) {
            val.getAdicionalEspecialidades().forEach(obj -> {
                adicionalEspecialidadeService.create(pedidoEspecialidade, obj);
            });
        }
        for (int i = 0; i <= val.getQuantidade(); i++) {
            val.getEspecialidade().getEspecialidadeMercadoria().forEach(obj -> {
                mercadoriaService.reduzSaldo(mercadoriaService.findById(obj.getMercadoria().getId()), obj.getQuantidade());
            });
        }
    }

    public void delete(PedidoEspecialidade val) {
        val.getEspecialidade().getEspecialidadeMercadorias().forEach(obj -> {
            mercadoriaService.aumentaSaldo(obj.getMercadoria(),obj.getQuantidade());
        });
        pedidoEspecialidadeRepository.delete(val);
    }


    public void createUpdateDelete(Pedido pedido, List<PedidoEspecialidadeDTO> pedidoEspecialidadeDto) {
        for (PedidoEspecialidadeDTO dto : pedidoEspecialidadeDto) {
            if (dto.getId() == null) {
                this.create(dto,pedido);
            }
        }
        for (PedidoEspecialidade banco : pedido.getPedidoEspecialidades()) {
            boolean encontrado = false;
            for (PedidoEspecialidadeDTO dto : pedidoEspecialidadeDto) {
                if (Objects.nonNull(dto.getId()) && dto.getId().equals(banco.getId())) {
                    encontrado = true;
                    updatePedidoEspecialidade(banco, dto);
                }
            }
            if (!encontrado) {
                this.delete(banco);
            }
        }
    }

    @Transactional
    private void updatePedidoEspecialidade(PedidoEspecialidade banco, PedidoEspecialidadeDTO dto) {
        for (int i = 0; i <= banco.getQuantidade(); i++) {
            banco.getEspecialidade().getEspecialidadeMercadorias().forEach(obj -> {
                mercadoriaService.aumentaSaldo(mercadoriaService.findById(obj.getMercadoria().getId()), obj.getQuantidade());
            });
        }
        banco.setQuantidade(dto.getQuantidade());
        banco.setValor(dto.getValor());
        for (int i = 0; i <= dto.getQuantidade(); i++) {
            banco.getEspecialidade().getEspecialidadeMercadorias().forEach(obj -> {
                mercadoriaService.reduzSaldo(mercadoriaService.findById(obj.getMercadoria().getId()), obj.getQuantidade());
            });
        }
        pedidoEspecialidadeRepository.save(banco);
    }
}
