package com.example.Authentication.Caixa.service;

import com.example.Authentication.Caixa.DTO.CaixaDTO;
import com.example.Authentication.Caixa.DTO.CaixaDashBoardDTO;
import com.example.Authentication.Caixa.DTO.CaixaOpenDTO;
import com.example.Authentication.Caixa.model.Caixa;
import com.example.Authentication.Caixa.repository.CaixaRepository;
import com.example.Authentication.Pedido.service.PedidoService;
import com.example.Authentication.Utils.Interfaces.LocaleInteface;
import com.example.Authentication.Utils.exceptions.NotFoundException;
import com.example.Authentication.Utils.filtro.Filtro;
import com.example.Authentication.Utils.filtro.FiltroDate;
import com.example.Authentication.Utils.pagination.Pagination;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CaixaService {

    private final CaixaRepository caixaRepository;
    private final MessageSource messageSource;
    @Autowired
    private PedidoService pedidoService;
    private static final Map<String, String> CAMPO_ORDENACAO = new HashMap<>();
    static {
        CAMPO_ORDENACAO.put("numeroCaixa", "numero_caixa");
        CAMPO_ORDENACAO.put("dataAbertura", "data_abertura");
        CAMPO_ORDENACAO.put("valorAberturaCaixa", "valor_abertura_caixa");
        CAMPO_ORDENACAO.put("dataFechamento", "data_fechamento");
        CAMPO_ORDENACAO.put("valorFechamentoCaixa", "valor_fechamento_caixa");
    }

    public Page<CaixaDTO> findAllByPage(Filtro filtro) {
        Pageable pageable = Pagination.createPageableFromFiltro(filtro, CAMPO_ORDENACAO, "numero_caixa");
        Page<Caixa> caixaPage = caixaRepository.findAll(pageable, filtro.getSearch());
        return caixaPage.map(CaixaDTO::new);
    }

    public CaixaDTO openCaixa(CaixaOpenDTO caixaDTO) {
        List<Caixa> caixas = caixaRepository.findAll();
        boolean verifyOpenCaixa = caixas.stream().anyMatch(caixa -> caixa.getCaixaAberto().equals(0));
        if (!verifyOpenCaixa) {
            Caixa caixa = new Caixa();
            caixa.setValorAberturaCaixa(caixaDTO.getValorAberturaCaixa());
            caixa.setDataAbertura(new Date());
            caixa.setCaixaAberto(0);
            caixa.setAtivo(1);
            return new CaixaDTO(caixaRepository.save(caixa));
        } else {
            throw new DataIntegrityViolationException(messageSource.getMessage("error.caixa.open",
                    null, LocaleInteface.BR));
        }
    }

    public Caixa findById(Integer id) {
        Caixa caixa = caixaRepository.findById(id).orElseThrow(() -> new NotFoundException(
                messageSource.getMessage("error.isEmpty", null, LocaleInteface.BR)
        ));
        return caixa;
    }

    public CaixaDTO findByIdDto(Integer id) {
        return new CaixaDTO(this.findById(id));
    }

    public void close(Integer id) {
        Caixa caixa = caixaRepository.findById(id).orElseThrow(() -> new NotFoundException(
                messageSource.getMessage("error.isEmpty", null, LocaleInteface.BR)));
        caixa.setDataFechamento(new Date());
        caixa.setValorFechamentoCaixa(pedidoService.getValorTotalByCaixa(id));
        caixa.setCaixaAberto(1);
        caixaRepository.save(caixa);
    }

    public List<CaixaDashBoardDTO> getValuesCaixaByDashBoard(FiltroDate filtroDate) throws ParseException {
        String data = "2000-01-01";
        SimpleDateFormat parser = new SimpleDateFormat("dd-MM-yyyy");
        Date date = parser.parse(data);
        filtroDate.setDataInicial(Objects.isNull(filtroDate.getDataInicial()) ? date : filtroDate.getDataInicial());
        filtroDate.setDataFinal(Objects.isNull(filtroDate.getDataFinal()) ? new Date() : filtroDate.getDataFinal());
        List<Caixa> list = caixaRepository.getValuesFechamentoAndDateCaixaByDashBoard(filtroDate.getDataInicial(), filtroDate.getDataFinal());
        if (Objects.nonNull(list) && !list.isEmpty()) {
            return list.stream().map(CaixaDashBoardDTO::new).collect(Collectors.toList());
        }
        return List.of();
    }
}
