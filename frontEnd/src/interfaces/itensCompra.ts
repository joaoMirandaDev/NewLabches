import IMercadoria from './mercadoria'

export default interface ITensCompra {
  id?: number
  mercadoriaDTO?: IMercadoria
  quantidade?: number
  data?: Date
  valorCompra?: number
}
