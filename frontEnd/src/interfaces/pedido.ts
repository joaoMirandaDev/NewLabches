import IFormaPagamento from './formaPagamento'
import ITipoPedido from './tipoPedido'

export default interface IPedido {
  id?: number
  numeroPedido?: string
  nomeCliente?: string
  mesa?: number
  valorTotal?: number
  pago?: number
  tipo?: ITipoPedido
  formaPagamento?: IFormaPagamento
}
