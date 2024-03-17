/* eslint-disable react-hooks/rules-of-hooks */
import jwtDecode from 'jwt-decode'
import Cookies from 'js-cookie'
import { removeformatarCPFCNPJ } from 'src/utils/FormatterUtils'
import ILogin from 'src/interfaces/login'
import api from 'src/utils/Api'
import { ErrorNotification } from '@components/common'

const API_URL = '/api/usuarios/auth'
const API_URL_VERIFY = '/api/usuarios/validatorUser'
const TOKEN_COOKIE_KEY: string = 'token'
const USER_COOKIE_KEY: string = 'user'
const DADOS_USUARIO: string = 'dados_usuario'
const ROLE: string = 'role'

// Function to remove all cookies
const removeAllCookies = () => {
  const cookies = Object.keys(Cookies.get())
  cookies.forEach(cookie => {
    Cookies.remove(cookie)
  })
}

const clearAuthentication = () => {
  removeAllCookies()
}

export const loginAuth = async (credentials: ILogin) => {
  credentials.login = removeformatarCPFCNPJ(credentials.login)
  await api
    .post(API_URL, credentials)
    .then(async response => {
      const token = response.data.token
      const user = jwtDecode(token)

      Cookies.set(TOKEN_COOKIE_KEY, token, { expires: 1, secure: true })
      Cookies.set(USER_COOKIE_KEY, JSON.stringify(user), {
        expires: 1,
        secure: true,
      })
      const getUserCookie: string = Cookies.get('user') ?? ''
      const userCookie = JSON.parse(getUserCookie)
      const usuario = userCookie.sub
      Cookies.set(DADOS_USUARIO, usuario, { expires: 1, secure: true })
      await api
        .get(`/api/usuarios/findByLogin/${response.data.login}`)
        .then(response => {
          Cookies.set(ROLE, response.data.role.name)
        })
    })
    .catch(() => {
      ErrorNotification({ message: 'Erro' })
      return false
    })
  return true
}

export const clearDados = () => {
  removeAllCookies()
  clearAuthentication()
}

export const verifyUserExpired = async () => {
  const check = await api
    .get(`${API_URL_VERIFY}/${Cookies.get(TOKEN_COOKIE_KEY)}`)
    .then(response => {
      if (!response.data) {
        removeAllCookies()
        clearAuthentication()
        return response.data
      }
      return response.data
    })
    .catch(() => {
      removeAllCookies()
      clearAuthentication()
    })
  return check
}
