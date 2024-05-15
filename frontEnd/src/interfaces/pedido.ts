import IPedidoEspecialidade from './PedidoEspecialidade'
import IPedidoMercadoria from './PedidoMercadoria'
import IFormaPagamento from './formaPagamento'
import ITipoPedido from './tipoPedido'

export default interface IPedido {
  id?: number
  numeroPedido?: string
  nomeCliente?: string
  observacao?: string
  mesa?: number
  pedidoEspecialidade?: IPedidoEspecialidade[]
  pedidoMercadoria?: IPedidoMercadoria[]
  valorTotal?: number
  pago?: number
  tipoPedido?: ITipoPedido
  formaPagamento?: IFormaPagamento
}
