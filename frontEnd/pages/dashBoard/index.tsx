import { ErrorNotification } from '@components/common'
import PiramideChart from '@components/common/graficos/piramide'
import { Card, Flex, Text, Title } from '@mantine/core'
import { DatePickerInput, DateValue } from '@mantine/dates'
import { useEffect, useState } from 'react'
import IEspecialidadeVendidas from 'src/interfaces/especialidadeTop'
import IFiltroDate from 'src/interfaces/filtroDate'
import api from 'src/utils/Api'
import {
  COMPRAS_GET_VALOR_TOTAL,
  GET_TOP_PEDIDOS_ESPECIALIDADE,
  GET_VALOR_TOTAL_PEDIDOS,
  GET_VALOR_TOTAL_VENDAS,
} from 'src/utils/Routes'
export default function DashBoard() {
  const [totalVendas, setTotalVendas] = useState<number>(0)
  const [totalPedidos, setTotalPedidos] = useState<number>(0)
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
    await api
      .post(GET_TOP_PEDIDOS_ESPECIALIDADE, data)
      .then(val => {
        setEspecialidadesMaisVendidas(val.data)
      })
      .catch(() => {
        ErrorNotification({ message: 'Erro ao buscar valor total de vendas' })
      })
    await api
      .post(GET_VALOR_TOTAL_VENDAS, data)
      .then(totalVendas => {
        setTotalVendas(totalVendas.data)
      })
      .catch(() => {
        ErrorNotification({ message: 'Erro ao buscar valor total de vendas' })
      })
    await api
      .post(GET_VALOR_TOTAL_PEDIDOS, data)
      .then(totalVendas => {
        setTotalPedidos(totalVendas.data)
      })
      .catch(() => {
        ErrorNotification({ message: 'Erro ao buscar valor total de pedidos' })
      })
    await api
      .post(COMPRAS_GET_VALOR_TOTAL, data)
      .then(total => {
        setTotalCompras(total.data)
      })
      .catch(() => {
        ErrorNotification({ message: 'Erro ao buscar valor total de compras' })
      })
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
        <Flex mb={'1rem'} justify={'flex-start'}>
          <DatePickerInput
            value={data.dataInicial}
            withAsterisk={false}
            w={'20%'}
            required
            clearable
            mr={'0.5rem'}
            onChange={val => handleChange(val, 'dataInicial')}
            label="Selecione a data inicial"
            placeholder="Escolha uma data"
            maxDate={new Date()}
          />
          <DatePickerInput
            value={data.dataFinal}
            onChange={val => handleChange(val, 'dataFinal')}
            withAsterisk={false}
            clearable
            w={'20%'}
            required
            mr={'0.5rem'}
            label="Selecione a data final"
            placeholder="Escolha uma data"
            maxDate={new Date()}
          />
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
              <Title fz={'sm'}>Valor de vendas realizadas</Title>
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
        </Flex>
      </>
    )
  }

  return (
    <>
      <Text fz={'1.5rem'} mb={'0.5rem'}>
        DashBoard
      </Text>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        {DatesAndCard()}
        <PiramideChart especialidade={especialidadesMaisVendidas} />
      </Card>
    </>
  )
}
