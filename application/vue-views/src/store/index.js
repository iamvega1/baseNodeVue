import Vue from 'vue'
import Vuex from 'vuex'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
  	permission,
    tagsView,
    user
  },
  getters
})

export default store
