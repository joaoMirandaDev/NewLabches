import IMercadoria from './mercadoria'

export default interface IEspecialidadeMercadoria {
  id?: number | null
  idMercadoria?: number
  mercadoria?: IMercadoria | null
  quantidade?: number
  valor?: number
}
