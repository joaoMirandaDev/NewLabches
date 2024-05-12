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
        val.getEspecialidade().getEspecialidadeMercadoria().forEach(obj -> {
            mercadoriaService.reduzSaldo(mercadoriaService.findById(obj.getMercadoria().getId()), obj.getQuantidade());
        });
    }

    public void delete(PedidoEspecialidade val) {
        pedidoEspecialidadeRepository.delete(val);
    }

    public void createUpdateDelete(Pedido pedido, List<PedidoEspecialidade> pedidoEspecialidades,
                                   List<PedidoEspecialidadeDTO> pedidoEspecialidadeDto) {
        if (pedidoEspecialidades.isEmpty() && !pedidoEspecialidadeDto.isEmpty()) {
            createFromDto(pedido, pedidoEspecialidadeDto);
        }

        if (!pedidoEspecialidades.isEmpty() && pedidoEspecialidadeDto.isEmpty()) {
            deleteExisting(pedidoEspecialidades);
        }

        if (!pedidoEspecialidades.isEmpty() && !pedidoEspecialidadeDto.isEmpty()) {
            updateOrAdd(pedido, pedidoEspecialidades, pedidoEspecialidadeDto);
        }
    }

    private void createFromDto(Pedido pedido, List<PedidoEspecialidadeDTO> pedidoEspecialidadeDto) {
        pedidoEspecialidadeDto.forEach(dto -> this.create(dto, pedido));
    }

    private void deleteExisting(List<PedidoEspecialidade> pedidoEspecialidades) {
        pedidoEspecialidades.forEach(this::delete);
    }

    private void updateOrAdd(Pedido pedido, List<PedidoEspecialidade> pedidoEspecialidades,
                             List<PedidoEspecialidadeDTO> pedidoEspecialidadeDto) {
        for (PedidoEspecialidadeDTO dto : pedidoEspecialidadeDto) {
            boolean encontrado = false;
            for (PedidoEspecialidade val : pedidoEspecialidades) {
                PedidoEspecialidade pedidoEspecialidade = pedidoEspecialidadeRepository.findById(val.getId())
                        .orElseThrow(() -> new NotFoundException(messageSource.getMessage("error.isEmpty", null, LocaleInteface.BR)));

                if (dto.getId().equals(val.getId())) {
                    encontrado = true;
                    updatePedidoEspecialidade(dto, val, pedidoEspecialidade);
                    updateAdicionalEspecialidades(dto, val, pedidoEspecialidade);
                }
            }
            if (!encontrado) {
                createAdditionalEspecialidades(dto, pedidoEspecialidades);
            }
        }
    }

    private void updatePedidoEspecialidade(PedidoEspecialidadeDTO dto, PedidoEspecialidade val,
                                           PedidoEspecialidade pedidoEspecialidade) {
        pedidoEspecialidade.setEspecialidade(especialidadeService.findById(dto.getEspecialidade().getId()));
        pedidoEspecialidade.setQuantidade(dto.getQuantidade());
        pedidoEspecialidade.setValor(dto.getValor());
    }

    private void updateAdicionalEspecialidades(PedidoEspecialidadeDTO dto, PedidoEspecialidade val,
                                               PedidoEspecialidade pedidoEspecialidade) {
        List<AdicionalEspecialidade> adicionalEspecialidades = val.getAdicionalEspecialidades();
        List<AdicionalEspecialidadeDTO> adicionalEspecialidadesDTO = dto.getAdicionalEspecialidades();

        if (!adicionalEspecialidadesDTO.isEmpty() && adicionalEspecialidades.isEmpty()) {
            adicionalEspecialidadesDTO.forEach(adicional -> adicionalEspecialidadeService.create(pedidoEspecialidade, adicional));
        }

        if (adicionalEspecialidadesDTO.isEmpty() && !adicionalEspecialidades.isEmpty()) {
            adicionalEspecialidades.forEach(adicionalEspecialidadeService::delete);
        }

        if (!adicionalEspecialidadesDTO.isEmpty() && !adicionalEspecialidades.isEmpty()) {
            updateOrAddAdicionalEspecialidades(dto, adicionalEspecialidades, pedidoEspecialidade);
        }
    }

    private void updateOrAddAdicionalEspecialidades(PedidoEspecialidadeDTO dto,
                                                    List<AdicionalEspecialidade> adicionalEspecialidades, PedidoEspecialidade pedidoEspecialidade) {
        for (AdicionalEspecialidadeDTO especialidadeDTO : dto.getAdicionalEspecialidades()) {
            boolean adicionalEncontrado = false;
            for (AdicionalEspecialidade adicionalEspecialidade : adicionalEspecialidades) {
                if (adicionalEspecialidade.getId().equals(especialidadeDTO.getId())) {
                    adicionalEncontrado = true;
                    adicionalEspecialidadeService.update(especialidadeDTO);
                }
            }
            if (!adicionalEncontrado) {
                adicionalEspecialidadeService.create(pedidoEspecialidade, especialidadeDTO);
            }
        }
    }

    private void createAdditionalEspecialidades(PedidoEspecialidadeDTO dto, List<PedidoEspecialidade> pedidoEspecialidades) {
        for (PedidoEspecialidade pedidoEspecialidade : pedidoEspecialidades) {
            dto.getAdicionalEspecialidades().forEach(adicional -> adicionalEspecialidadeService.create(pedidoEspecialidade, adicional));
        }
    }

//    public void createUpdateDelete(Pedido pedido,List<PedidoEspecialidade> pedidoEspecialidades,
//                                   List<PedidoEspecialidadeDTO> pedidoEspecialidadeDto) {
//        if (pedidoEspecialidades.isEmpty() && !pedidoEspecialidadeDto.isEmpty()) {
//            pedidoEspecialidadeDto.forEach(obj -> this.create(obj, pedido));
//        }
//        if (!pedidoEspecialidades.isEmpty() && pedidoEspecialidadeDto.isEmpty()) {
//            pedidoEspecialidades.forEach(obj -> this.delete(obj));
//        }
//        if (!pedidoEspecialidades.isEmpty() && !pedidoEspecialidadeDto.isEmpty()) {
//            for (PedidoEspecialidadeDTO dto : pedidoEspecialidadeDto) {
//                Boolean encontrado = false;
//                for (PedidoEspecialidade val : pedidoEspecialidades) {
//                    PedidoEspecialidade pedidoEspecialidade = pedidoEspecialidadeRepository.findById(val.getId()).orElseThrow(() ->
//                            new NotFoundException(messageSource.getMessage("error.isEmpty", null, LocaleInteface.BR)));
//                    if (dto.getId().equals(val.getId())) {
//                        encontrado = true;
//                         pedidoEspecialidade.setEspecialidade(especialidadeService.findById(dto.getEspecialidade().getId()));
//                         pedidoEspecialidade.setQuantidade(dto.getQuantidade());
//                         pedidoEspecialidade.setValor(dto.getValor());
//                        if (!dto.getAdicionalEspecialidades().isEmpty() && val.getAdicionalEspecialidades().isEmpty()) {
//                            dto.getAdicionalEspecialidades().forEach(adicional -> adicionalEspecialidadeService.create(pedidoEspecialidade, adicional));
//                        }
//                        if (dto.getAdicionalEspecialidades().isEmpty() && !val.getAdicionalEspecialidades().isEmpty()) {
//                            val.getAdicionalEspecialidades().forEach(adicional -> adicionalEspecialidadeService.delete(adicional));
//                        }
//                        if (!dto.getAdicionalEspecialidades().isEmpty() && !val.getAdicionalEspecialidades().isEmpty()) {
//                            for (AdicionalEspecialidadeDTO especialidadeDTO : dto.getAdicionalEspecialidades()) {
//                                boolean adicionalEncontrado = false;
//                                for (AdicionalEspecialidade adicionalEspecialidade : val.getAdicionalEspecialidades()) {
//                                    if (adicionalEspecialidade.getId().equals(especialidadeDTO.getId())) {
//                                        adicionalEncontrado = true;
//                                        adicionalEspecialidadeService.update(especialidadeDTO);
//                                    } else {
//                                        adicionalEspecialidadeService.create(pedidoEspecialidade, especialidadeDTO);
//                                    }
//                                }
//                            }
//                        }
//                    }
//                    if (encontrado.equals(false)) {
//                        dto.getAdicionalEspecialidades().forEach(adicional -> adicionalEspecialidadeService.create(pedidoEspecialidade, adicional));
//                    }
//                }
//            }
//        }
//    }
}
