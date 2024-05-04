import ICategoria from './ICategoria'

export default interface IEspecialidade {
  id?: number
  nome?: string
  categoria?: ICategoria
  dataCadastro?: string
  ativo?: number
  preco?: number
  especialidadeMercadoria?: IEspecialidade[]
}
