export const state = {
    user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null
}
export const mutations = {
    changeLogin(state, data) {
        // 第一步将数据存入state状态中
        state.user = data
        // 第二步将数据存入sessionStorage中
        if (data) {
            sessionStorage.setItem('user', JSON.stringify(state.user))
        }else{
            sessionStorage.removeItem('user')
        }
    }
}
export const getters = {
    user(state) {
        return state.user
    }
}