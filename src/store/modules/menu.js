import { getMenu } from "../../utils/request";
const state = {
    menuList: []
}
const mutations = {
    changeMenuList(state, arr) {
        state.menuList = arr
    }
}
const actions = {
    menuListActions(context) {
        //    树形结构必须传的参数---对应的在request里面的getMenu也要传参
        getMenu({ istree: true }).then(res => {
            context.commit('changeMenuList', res.data.list)
        }
        )
    }
}
const getters = {
    menuList(state) {
        return state.menuList
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}