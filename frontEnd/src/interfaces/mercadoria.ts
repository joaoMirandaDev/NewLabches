interface unidadeMedida {
  id: number | null
  nome: string
}
export default interface IMercadoria {
  id: number | null
  nome?: string
  unidadeMedida: unidadeMedida
  limiteMinimo?: number
  valorVenda?: number
  saldoEstoque?: number
  dataCadastro?: Date
}
