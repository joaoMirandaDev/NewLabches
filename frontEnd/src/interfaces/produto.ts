import IMercadoria from './mercadoria'

interface IEspecialidadeMercadoria {
  id?: number
  idMercadoria?: number
  mercadoria?: IMercadoria
  quantidade: number
}

export default interface IProduto {
  id?: number | null
  nome?: string
  preco?: number
  especialidadeMercadoria?: IEspecialidadeMercadoria[]
  categoria: {
    id: number | null
    nome: string
  }
  ingrediente?: string
  data_cadastro?: Date
  precoFormatado?: string | null
}
