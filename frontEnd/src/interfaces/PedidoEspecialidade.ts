import IMercadoria from './mercadoria'

interface IMercadoriaPedido {
  mercadoria?: IMercadoria
  quantidade?: number
}

interface IEspecialidade {
  id?: number
  especialidadeMercadoria?: IMercadoriaPedido[]
}

export default interface IPedidoEspecialidade {
  id?: number | null
  quantidade?: number
  valor?: number
  especialidade?: IEspecialidade
}
