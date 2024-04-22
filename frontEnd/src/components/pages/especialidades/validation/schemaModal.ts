import z from 'zod'

const ModalCadastoMercadoria = () => {
  const requiredField = 'Campo obrigatório'
  return z.object({
    quantidade: z.number().positive({ message: requiredField }),
  })
}

export { ModalCadastoMercadoria }
