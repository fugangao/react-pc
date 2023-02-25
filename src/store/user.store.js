import { http } from "@/utils"
import { makeAutoObservable, runInAction } from "mobx"


class UserStore {
  userInfo = {}
  constructor() {
    makeAutoObservable(this)
  }
  getUserInfo = async () => {
    const { data } = await http.get('/user/profile')
    runInAction(() => {
      this.userInfo = data.data
    })
  }

}


export default UserStore 