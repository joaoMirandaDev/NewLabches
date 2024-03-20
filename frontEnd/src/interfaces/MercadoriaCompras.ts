interface IUnidadeMedida {
  id?: number
  nome?: string
}

export default interface IMercadoriaCompra {
  id?: number
  quantidade?: number
  valorCompra?: number
  valorFinalUnitario?: number
  unidadeMedida?: IUnidadeMedida
  dataNascimento?: Date
  quantidadeFinal?: number
}
