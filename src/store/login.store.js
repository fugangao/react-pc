import { makeAutoObservable } from "mobx"
import { http, getToken, setToken, removeToken } from "@/utils"
class LoginStore {
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }
  login = async ({ mobile, code }) => {
    const { data } = await http.post('http://geek.itheima.net/v1_0/authorizations', { mobile, code })
    this.token = data.data.token
    setToken(this.token)
  }
  logOut = () => {
    this.token = ''
    removeToken()
  }
}
export default LoginStore