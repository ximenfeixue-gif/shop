import { getSpec, specCount } from "../../utils/request";
const state = {
    specList: [],
    size: 2,//每页显示的条数
    page: 1, //当前页码数
    count: 0
}
const mutations = {
    changeSpecList(state, arr) {
        state.specList = arr
    },
    changeCount(state, num) {
        state.count = num
    },
    changePage(state,page){
        state.page=page
    }

}
const actions = {
    specListActions(context) {
        var params = {
            size: context.state.size,
            page: context.state.page
        }
        // 发起请求
        getSpec(params).then(res => {
            context.commit('changeSpecList', res.data.list)
        })
    },
    countActions(context) {
        specCount().then(res => {
            context.commit('changeCount', res.data.list[0].total)
        })
    },
    pageActions(context,page){
        context.commit('changePage',page)
    }
}
const getters = {
    specList(state) {
        return state.specList
    },
    count(state) {
        return state.count
    }
}
export default { state, mutations, actions, getters, namespaced: true }