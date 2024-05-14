import IMercadoria from './mercadoria'

export default interface IAdicional {
  id?: number
  mercadoria?: IMercadoria | null
  quantidade?: number
}
