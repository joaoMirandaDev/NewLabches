/* eslint-disable @typescript-eslint/no-explicit-any */
import IPessoa from '../interfaces/colaborador'
import axios from 'axios'
import Cookies from 'js-cookie'

export const cadastroFuncionario = async (object: IPessoa) => {
  const data = {
    method: 'post',
    url: `http://localhost:1080/api/pessoa/adicionar`,
    data: object,
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  }
  return data
}

export const dadosLogin = async () => {
  const usuario = axios.get(
    `http://localhost:1080/api/usuarios/findByLogin/${Cookies.get(
      'dados_usuario'
    )}`
  )
  return usuario
}

export const getIdUser = async () => {
  const usuario = axios.get(
    `http://localhost:1080/api/usuarios/findByLogin/${Cookies.get(
      'dados_usuario'
    )}`
  )
  return (await usuario).data.id
}

export const dadosPessoa = async () => {
  const usuario = axios.get(
    `http://localhost:1080/api/pessoa/findByUser/${Cookies.get(
      'dados_usuario'
    )}`
  )
  return await usuario
}
export const deletePessoaAndUser = async (data: number) => {
  const usuario = axios.delete(
    `http://localhost:1080/api/usuarios/deleteById/${data}`
  )
  return await usuario
}
