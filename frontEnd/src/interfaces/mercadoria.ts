interface unidadeMedida {
  id?: number
  nome?: string
}
export default interface IMercadoria {
  id?: number
  nome?: string
  unidadeMedida?: unidadeMedida
  valorVenda?: number
  saldoEstoque?: number
  dataCadastro?: Date
}
