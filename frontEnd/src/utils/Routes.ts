/* Rotas caixa */
export const CAIXA_PAGE: string = '/api/caixa/list'
export const CAIXA_OPEN: string = '/api/caixa/openCaixa'
export const CAIXA_BY_ID: string = '/api/caixa/findById/'

/* Rotas compras */
export const COMPRAS_PAGE: string = '/api/compras/list'
export const COMPRAS_BY_ID: string = 'api/compras'
export const COMPRAS_ADD: string = 'api/compras/addCompra'
export const COMPRAS_EDIT_BY_ID: string = 'api/compras/edit'
export const COMPRAS_DELETE_BY_ID: string = '/api/compras/deleteById/'

/* Rotas categoria */
export const FIND_ALL_CATEGORIA: string = 'api/categoria/findAll'

/* Rotas colaborador */
export const FIND_COLABORADOR: string = '/api/colaborador/findByCpfCnpj/'

/* Rotas fornecedores */
export const FIND_ALL_FORNECEDOR: string = 'api/fornecedor/findAll'

/* Rotas forma pagamento */
export const FIND_ALL_FORMA_PAGAMENTO: string = 'api/formaPagamento/findAll'

/* Rotas mecadoria */
export const MERCADORIA_PAGE: string = '/api/mercadoria/list'
export const MERCADORIA_ADD: string = 'api/mercadoria/adicionar'
export const FIND_ALL_MERCADORIA: string = 'api/mercadoria/findAll'
export const MERCADORIA_BY_ID: string = 'api/mercadoria/findById/'
export const MERCADORIA_DELETE_BY_ID: string = '/api/mercadoria/deleteById/'
export const MERCADORIA_EDITAR_BY_ID: string = 'api/mercadoria/editar'

/* Rotas mercadoria comprs */
export const MERCADORIA_COMPRAS_BY_ID_PAGE: string = 'api/merdoriasCompra/list/'

/* Rotas produtos */
export const PRODUTO_PAGE: string = '/api/produtos/list'
export const PRODUTO_BY_ID: string = 'api/produtos/findById/'
export const PRODUTO_ADD: string = 'api/produtos/adicionar'
export const PRODUTO_DELETE_BY_ID: string = '/api/produtos/delete/'
export const PRODUTO_EDIT: string = 'api/produtos/editar'

/* Rotas pedido */
export const PEDIDO_PAGE: string = '/api/pedido/list/'
export const GET_VALOR_TOTAL_BY_CAIXA: string = '/api/pedido/getValorTotal/'

/* Rotas unidade medida */
export const FIND_ALL_UNIDADE_MEDIDA: string = 'api/unidadeMedida/findAll'

/* Rotas tipo */
export const FIND_ALL_TIPO: string = 'api/tipo'

/* Rotas usuario */
export const FIND_BY_USUARIO_LOGIN: string = '/api/usuarios/findByLogin/'
export const VALIDATOR_USUARIO: string = '/api/usuarios/validatorUser/'
export const AUTH_USUARIO: string = '/api/usuarios/auth'
