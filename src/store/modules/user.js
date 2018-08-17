import cookies from 'js-cookie'

import {
  getToken,
  setToken
} from '@/utils/token'
const user = {
  state: {
    username: cookies.get('username')||'',
    usertoken: getToken()
  },
  mutations: {
    SET_USERNAME: (state, username) => {
      state.username = username
      cookies.set('username',username)
    },
    SET_USERTOKEN: (state, usertoken) => {
      state.usertoken = usertoken
      setToken(usertoken)
    }
  },
  actions: {
    setUsertoken({commit},usertoken){
        commit('SET_USERTOKEN',usertoken)
    },
    setUsername({commit},username){
        commit('SET_USERNAME',username)
    }
  }
}

export default user
