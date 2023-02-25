import LoginStore from "./login.store"
import UserStore from "./user.store"
import React from "react"
import ChannelStore from "./channel.store"
class RootStore {
  constructor() {
    this.loginStore = new LoginStore()
    this.userStore = new UserStore()
    this.channelStore = new ChannelStore()
  }
}

const rootStore = new RootStore()

const context = React.createContext(rootStore)

export const useStore = () => {
  return React.useContext(context)
}
