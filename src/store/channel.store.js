import { makeAutoObservable, runInAction } from "mobx"
import { http } from "@/utils"
import { message } from "antd"
class ChannelStore {
  channelList = []
  constructor() {
    makeAutoObservable(this)
  }
  getChannelList = async () => {
    try {
      const { data } = await http.get('/channels')
      runInAction(() => {
        this.channelList = data.data.channels
      })
    } catch (error) {
      message.error(error.message)
    }
  }
}




export default ChannelStore