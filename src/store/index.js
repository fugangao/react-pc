import LoginStore from "./login.store"
import UserStore from "./user.store"
import React from "react"
class RootStore {
  constructor() {
    this.loginStore = new LoginStore()
    this.userStore = new UserStore()
  }
}

const rootStore = new RootStore()

const context = React.createContext(rootStore)

export const useStore = () => {
  return React.useContext(context)
}
