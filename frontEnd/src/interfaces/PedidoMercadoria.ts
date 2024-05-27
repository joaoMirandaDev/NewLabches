import IMercadoria from './mercadoria'

export default interface IPedidoMercadoria {
  id?: number | null
  mercadoria?: IMercadoria | null
  quantidade?: number
}
