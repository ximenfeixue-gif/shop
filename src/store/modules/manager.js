import { getManager, getCount } from "../../utils/request";
const state = {
    managerList: [],
    // 每页展示的条数
    size: 2,
    // 当前展示的第几页
    page: 1,
    count: 0
}
const mutations = {
    changeManagerList(state, arr) {
        state.managerList = arr
    },
    changeCount(state, num) {
        state.count = num
    },
    changePage(state, page) {
        state.page = page
    }
}
const actions = {
    managerListActions(context) {
        var params = {
            size: context.state.size,
            page: context.state.page
        }

        // 发起获取管理员列表请求
        getManager(params).then(res => {
            // 判断返回的列表数据是否为空，或者长度为零,如果为空，则将page-1，不为空则直接拉取列表数据
            if ((res.data.list == null || res.data.list.length == 0) && context.state.page > 1) {
                var p = context.state.page - 1
                context.commit('changePage', p)
                // 自己调用自己，然后再返回到actions中
                context.dispatch('managerListActions')
                return
            }
            context.commit('changeManagerList', res.data.list)
        }
        )
    },
    countActions(context) {
        // 发起获取总的记录数请求
        getCount().then(res => {
            context.commit('changeCount', res.data.list[0].total)
        })
    },
    pageActions(context, page) {
        context.commit('changePage', page)

    }
}
const getters = {
    managerList(state) {
        return state.managerList
    },
    count(state) {
        return state.count
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}