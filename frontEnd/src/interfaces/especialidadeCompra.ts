import IMercadoria from './mercadoria'

export default interface IEspecialidadeMercadoria {
  id?: number
  idMercadoria?: number
  mercadoria?: IMercadoria | null
  quantidade?: number
  valor?: number
}
