interface unidadeMedida {
  id: number | null
  nome: string
}

interface Tipo {
  id: number | null
  nome: string
}
export default interface IMercadoria {
  id: number | null
  nome?: string
  unidadeMedida: unidadeMedida
  tipo: Tipo
  limiteMinimo?: number
  valorVenda?: number
  saldoEstoque?: number
  dataCadastro?: Date
}
