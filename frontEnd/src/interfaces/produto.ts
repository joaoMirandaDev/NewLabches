export default interface IProduto {
  id?: number
  nome?: string
  preco?: number
  categoria: {
    id: number | null
    nome: string | null
  }
  ingrediente?: string
  data_cadastro?: Date
  precoFormatado?: string | null
}
