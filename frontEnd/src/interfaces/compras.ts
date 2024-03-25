import IFormaPagamento from './formaPagamento'
import IFornecedor from './fornecedor'

export default interface ICompra {
  id: number | null
  formaPagamento?: IFormaPagamento
  fornecedor: IFornecedor
  dataCompra?: Date
  dataPagamento?: Date
  valorTotalCompra?: number
}
