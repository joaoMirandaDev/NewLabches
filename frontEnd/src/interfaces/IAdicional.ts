import IMercadoria from './mercadoria'

export default interface IAdicional {
  mercadoria?: IMercadoria | null
  quantidade?: number
}
