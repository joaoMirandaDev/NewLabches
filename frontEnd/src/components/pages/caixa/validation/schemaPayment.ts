import z from 'zod'

const schemaPayment = () => {
  const requiredField = 'Campo obrigatório'
  return z.object({
    id: z.number().positive({ message: requiredField }),
  })
}

export { schemaPayment }
