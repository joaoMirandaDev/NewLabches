package com.example.Authentication.ItensCompras.service;

import com.example.Authentication.Compras.model.Compras;
import com.example.Authentication.mercadoria.model.Mercadoria;
import com.example.Authentication.mercadoria.repository.MercadoriaRepository;
import com.example.Authentication.mercadoria.service.MercadoriaService;
import com.example.Authentication.ItensCompras.DTO.ItensComprasDTO;
import com.example.Authentication.ItensCompras.model.ItensCompras;
import com.example.Authentication.ItensCompras.repository.ItensCompraRepository;
import com.example.Authentication.Utils.Interfaces.LocaleInteface;
import com.example.Authentication.Utils.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ItensComprasService {

    private final MessageSource messageSource;

    private final MercadoriaRepository mercadoriaRepository;
    private final MercadoriaService mercadoriaService;
    private final ItensCompraRepository itensCompraRepository;


    public void saveListDto(List<ItensComprasDTO> itensComprasDTOS, Compras compras) {
        for (ItensComprasDTO itensComprasDTO : itensComprasDTOS) {
            ItensCompras itensCompras = new ItensCompras();
            Mercadoria mercadoria = mercadoriaRepository.
                    findById(itensComprasDTO.getMercadoriaDTO().getId()).orElseThrow(()
                            -> new NotFoundException(
                            messageSource.getMessage("error.isEmpty", null, LocaleInteface.BR)
                    ));
            if (Objects.isNull(mercadoria.getSaldoEstoque())) {
                mercadoria.setSaldoEstoque(0.0);
            }
            mercadoria.setSaldoEstoque(mercadoria.getSaldoEstoque() + mercadoriaService.
                    calculoQuantidade(mercadoria.getUnidadeMedida(),
                    mercadoria.getMultiplicador(), itensComprasDTO.getQuantidade()));
            itensCompras.setMercadoria(mercadoria);
            itensCompras.setCompras(compras);
            itensCompras.setQuantidade(itensComprasDTO.getQuantidade());
            itensCompras.setQuantidadeFinal(mercadoriaService.
                    calculoQuantidade(mercadoria.getUnidadeMedida(),
                            mercadoria.getMultiplicador(), itensComprasDTO.getQuantidade()));
            itensCompras.setValorCompra(itensComprasDTO.getValorCompra());
            itensCompras.setValorUnitario((itensCompras.getValorCompra() * itensCompras.getQuantidade()) / itensCompras.getQuantidadeFinal());
            itensCompras.setData(new Date());
            mercadoriaRepository.save(mercadoria);
            itensCompraRepository.save(itensCompras);

        }
    }

}
