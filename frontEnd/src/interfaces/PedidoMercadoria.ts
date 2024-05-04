import IMercadoria from './mercadoria'

export default interface IPedidoMercadoria {
  mercadoria?: IMercadoria | null
  quantidade?: number
}
