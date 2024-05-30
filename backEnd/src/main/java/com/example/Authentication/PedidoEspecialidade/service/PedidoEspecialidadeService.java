package com.example.Authentication.PedidoEspecialidade.service;

import com.example.Authentication.AdicionalEspecialidade.DTO.AdicionalEspecialidadeDTO;
import com.example.Authentication.AdicionalEspecialidade.model.AdicionalEspecialidade;
import com.example.Authentication.AdicionalEspecialidade.service.AdicionalEspecialidadeService;
import com.example.Authentication.Especialidade.DTO.EspecialidadeDTO;
import com.example.Authentication.Especialidade.DTO.EspecialidadeSelectDTO;
import com.example.Authentication.Especialidade.model.Especialidade;
import com.example.Authentication.Especialidade.service.EspecialidadeService;
import com.example.Authentication.Mercadoria.repository.MercadoriaRepository;
import com.example.Authentication.Mercadoria.service.MercadoriaService;
import com.example.Authentication.Pedido.model.Pedido;
import com.example.Authentication.PedidoEspecialidade.DTO.PedidoEspecialidadeDTO;
import com.example.Authentication.PedidoEspecialidade.DTO.PedidoEspecialidadeTopItensDTO;
import com.example.Authentication.PedidoEspecialidade.model.PedidoEspecialidade;
import com.example.Authentication.PedidoEspecialidade.repository.PedidoEspecialidadeRepository;
import com.example.Authentication.Utils.Interfaces.LocaleInteface;
import com.example.Authentication.Utils.exceptions.NotFoundException;
import com.example.Authentication.Utils.filtro.Filtro;
import com.example.Authentication.Utils.filtro.FiltroDate;
import lombok.RequiredArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PedidoEspecialidadeService {
    private final PedidoEspecialidadeRepository pedidoEspecialidadeRepository;
    private final MercadoriaService mercadoriaService;
    private final EspecialidadeService especialidadeService;

    public List<PedidoEspecialidadeTopItensDTO> getTopPedidoEspecialidade(FiltroDate filtroDate) {
        List<Object[]> objects = new ArrayList<>();
        if (Objects.isNull(filtroDate.getDataInicial()) && Objects.isNull(filtroDate.getDataFinal())) {
            objects = pedidoEspecialidadeRepository.getListPedidoEspecialidade();
        } else {
            filtroDate.setDataInicial(Objects.isNull(filtroDate.getDataInicial()) ? new Date() : filtroDate.getDataInicial());
            filtroDate.setDataFinal(Objects.isNull(filtroDate.getDataFinal()) ? new Date() : filtroDate.getDataFinal());
            objects = pedidoEspecialidadeRepository.getListPedidoEspecialidadeByPeriodo(filtroDate.getDataInicial(), filtroDate.getDataFinal());
        }

        return objects.stream().map(this::convertToPedidoEspecialidadeTopItensDTO).collect(Collectors.toList());
    }

    private PedidoEspecialidadeTopItensDTO convertToPedidoEspecialidadeTopItensDTO(Object[] objArray) {
        PedidoEspecialidadeTopItensDTO pedidoEspecialidadeTopItensDTO = new PedidoEspecialidadeTopItensDTO();

        Integer especialidadeId = (Integer) objArray[0];
        BigDecimal quantidade = (BigDecimal) objArray[1];

        Especialidade especialidade = especialidadeService.findById(especialidadeId);
        EspecialidadeSelectDTO especialidadeDTO = new EspecialidadeSelectDTO(especialidade);

        pedidoEspecialidadeTopItensDTO.setEspecialidade(especialidadeDTO);
        pedidoEspecialidadeTopItensDTO.setQuantidade(quantidade.intValue());

        return pedidoEspecialidadeTopItensDTO;
    }

    public void create(PedidoEspecialidadeDTO val, Pedido pedido) {
        PedidoEspecialidade pedidoEspecialidade = new PedidoEspecialidade();
        pedidoEspecialidade.setEspecialidade(especialidadeService.findById(val.getEspecialidade().getId()));
        pedidoEspecialidade.setPedido(pedido);
        pedidoEspecialidade.setQuantidade(val.getQuantidade());
        pedidoEspecialidade.setValor(val.getValor());
        pedidoEspecialidadeRepository.save(pedidoEspecialidade);
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
        for (PedidoEspecialidade banco : pedido.getPedidoEspecialidades()) {
            boolean encontrado = false;
            for (PedidoEspecialidadeDTO dto : pedidoEspecialidadeDto) {
                if (dto.getId() != null) {
                    if (banco.getId().equals(dto.getId())) {
                        encontrado = true;
                        updatePedidoEspecialidade(banco, dto);
                    }
                }
            }
            if (!encontrado) {
                this.delete(banco);
            }
        }

        if (pedidoEspecialidadeDto.isEmpty() && !pedido.getPedidoEspecialidades().isEmpty()) {
            pedido.getPedidoEspecialidades().forEach(val -> this.delete(val));
        }

        for (PedidoEspecialidadeDTO especialidadeDTO  : pedidoEspecialidadeDto) {
            if (Objects.isNull(especialidadeDTO.getId())) {
                this.create(especialidadeDTO, pedido);
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
