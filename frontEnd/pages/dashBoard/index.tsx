import { ErrorNotification } from '@components/common'
import 'dayjs/locale/pt-br'
import BarChart from '@components/common/graficos/bar'
import DonutChart from '@components/common/graficos/donut'
import PiramideChart from '@components/common/graficos/piramide'
import { Card, Flex, Grid, Text, Title } from '@mantine/core'
import { DatePickerInput, DateValue, DatesProvider } from '@mantine/dates'
import { useEffect, useState } from 'react'
import IEspecialidadeVendidas from 'src/interfaces/especialidadeTop'
import IFiltroDate from 'src/interfaces/filtroDate'
import IFormaPagamento from 'src/interfaces/formaPagamento'
import api from 'src/utils/Api'
import {
  CAIXA_GET_VALUES_BY_DASHBOARD,
  CAIXA_GET_VALUES_BY_DASHBOARD_MONTH,
  COMPRAS_GET_VALOR_TOTAL,
  GET_TOP_PEDIDOS_ESPECIALIDADE,
  GET_VALOR_TOTAL_BY_FORMA_PAGAMENTO,
  GET_VALOR_TOTAL_PEDIDOS,
  GET_VALOR_TOTAL_VENDAS,
} from 'src/utils/Routes'
interface IValorTotalByFormaPagamento {
  valor: number
  formaPagamentoDTO: IFormaPagamento
}
interface IGetValuesCaixaByDashBoard {
  id?: number
  dataAbertura?: Date
  valorFechamentoCaixa?: number | null
  numeroCaixa?: string
}
interface IGetValuesCaixaByMonth {
  data?: string
  valorTotal?: number
}
export default function DashBoard() {
  const [totalVendas, setTotalVendas] = useState<number>(0)
  const [getValuesCaixa, setValuesCaixa] = useState<
    IGetValuesCaixaByDashBoard[]
  >([])
  const [getValuesCaixaByMonth, setValuesCaixaByMonth] = useState<
    IGetValuesCaixaByMonth[]
  >([])
  const [totalPedidos, setTotalPedidos] = useState<number>(0)
  const [valorTotalFormaPagamento, setValorTotalFormaPagamento] = useState<
    IValorTotalByFormaPagamento[]
  >([])
  const [totalCompras, setTotalCompras] = useState<number>(0)
  const [especialidadesMaisVendidas, setEspecialidadesMaisVendidas] = useState<
    IEspecialidadeVendidas[]
  >([])
  const [data, setData] = useState<IFiltroDate>({
    dataFinal: null,
    dataInicial: null,
  })
  useEffect(() => {
    getAllMethods()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    getAllMethods()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])
  const getAllMethods = async () => {
    try {
      const [
        valorTotalFormaPagamento,
        especialidadesMaisVendidas,
        totalVendas,
        totalPedidos,
        totalCompras,
        getValuesCaixa,
        getValuesCaixaByMonth,
      ] = await Promise.all([
        api.post(GET_VALOR_TOTAL_BY_FORMA_PAGAMENTO, data),
        api.post(GET_TOP_PEDIDOS_ESPECIALIDADE, data),
        api.post(GET_VALOR_TOTAL_VENDAS, data),
        api.post(GET_VALOR_TOTAL_PEDIDOS, data),
        api.post(COMPRAS_GET_VALOR_TOTAL, data),
        api.post(CAIXA_GET_VALUES_BY_DASHBOARD, data),
        api.get(CAIXA_GET_VALUES_BY_DASHBOARD_MONTH),
      ])

      setValorTotalFormaPagamento(valorTotalFormaPagamento.data)
      setEspecialidadesMaisVendidas(especialidadesMaisVendidas.data)
      setTotalVendas(totalVendas.data)
      setTotalPedidos(totalPedidos.data)
      setTotalCompras(totalCompras.data)
      setValuesCaixa(getValuesCaixa.data)
      setValuesCaixaByMonth(getValuesCaixaByMonth.data)
    } catch (error) {
      ErrorNotification({
        message: 'Erro ao buscar dados',
      })
    }
  }

  const handleChange = (
    event: string | number | boolean | DateValue,
    key: string
  ) => {
    setData({ ...data, [key]: event })
  }

  const DatesAndCard = () => {
    return (
      <>
        <Flex mb={'0.5rem'} justify={'flex-start'}>
          <DatesProvider
            settings={{
              locale: 'pt-br',
            }}
          >
            <DatePickerInput
              value={data.dataInicial}
              withAsterisk={false}
              required
              clearable
              mr={'0.5rem'}
              onChange={val => handleChange(val, 'dataInicial')}
              label="Data inicial"
              placeholder="Escolha uma data inicial"
              maxDate={new Date()}
            />
            <DatePickerInput
              value={data.dataFinal}
              onChange={val => handleChange(val, 'dataFinal')}
              withAsterisk={false}
              clearable
              required
              mr={'0.5rem'}
              label="Data final"
              placeholder="Escolha uma data final"
              maxDate={new Date()}
            />
          </DatesProvider>
        </Flex>
        <Flex justify={'space-around'}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Flex align={'center'} direction={'column'}>
              <Title fz={'sm'}>Total de pedidos realizados</Title>
              {totalPedidos.toFixed(2)}
            </Flex>
          </Card>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Flex align={'center'} direction={'column'}>
              <Title fz={'sm'}>Valor total faturado(bruto)</Title>
              {totalVendas.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </Flex>
          </Card>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Flex align={'center'} direction={'column'}>
              <Title fz={'sm'}>Valor de compras realizadas</Title>
              {totalCompras.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </Flex>
          </Card>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Flex align={'center'} direction={'column'}>
              <Title fz={'sm'}>Valor total faturado(líquido)</Title>
              {(totalVendas - totalCompras).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </Flex>
          </Card>
        </Flex>
      </>
    )
  }

  return (
    <>
      <Text fz={'1.5rem'} fw={'bold'} mb={'0.5rem'}>
        DashBoard
      </Text>
      <Card shadow="sm" padding="md" radius="md" withBorder>
        {DatesAndCard()}
        <Grid
          gutter="xs"
          mt={'0.5rem'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(2, 360px)',
          }}
        >
          <Flex
            style={{
              gridColumnStart: 1,
              gridColumnEnd: 3,
              gridRowStart: 1,
              gridRowEnd: 2,
            }}
          >
            <BarChart
              title="Caixa"
              value={getValuesCaixa.map(c => c.valorFechamentoCaixa!)}
              names={getValuesCaixa.map(val => val.dataAbertura!)}
            />
          </Flex>
          <Flex
            style={{
              gridColumnStart: 3,
              gridColumnEnd: 4,
              gridRowStart: 1,
              gridRowEnd: 3,
            }}
          >
            <PiramideChart
              title="Especialidades mais vendidas"
              especialidade={especialidadesMaisVendidas}
            />
          </Flex>
          <Flex
            style={{
              gridColumnStart: 1,
              gridColumnEnd: 2,
              gridRowStart: 2,
              gridRowEnd: 3,
            }}
          >
            <DonutChart
              title="Faturamento por forma de pagamento"
              especialidade={valorTotalFormaPagamento}
            />
          </Flex>
          <Flex
            style={{
              gridColumnStart: 2,
              gridColumnEnd: 3,
              gridRowStart: 2,
              gridRowEnd: 3,
            }}
          >
            <BarChart
              title="Faturamento 2 últimos meses"
              value={getValuesCaixaByMonth.map(c => c.valorTotal!)}
              names={getValuesCaixaByMonth.map(val => val.data!)}
            />
          </Flex>
        </Grid>
      </Card>
    </>
  )
}
