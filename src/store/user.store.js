import { http } from "@/utils"
import { makeAutoObservable } from "mobx"


class UserStore {
  userInfo = {}
  constructor() {
    makeAutoObservable(this)
  }
  getUserInfo = async () => {
    const { data } = await http.get('/user/profile')
    this.userInfo = data.data
  }
 
}


export default UserStore 