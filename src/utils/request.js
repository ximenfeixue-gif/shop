import axios from 'axios'
import qs from 'qs'
import { errorAlert } from './alert'
import store from '../store/index'
// 导出路由
import router from "../router/index";
// 设置基础路径
const baseUrl = '/api'
// req.headers.authorization
// 设置请求头信息
axios.interceptors.request.use(config => {
    console.group('本次的请求路径为' + config.url)
    if (config.url !== baseUrl + '/api/userlogin') {
        // 只要不是登录页面就需要设置请求头
        config.headers.authorization = store.state.user.token
    }
    console.log(config);
    return config
})
// 设置一个响应拦截
axios.interceptors.response.use(res => {
    //  把所有错误的信息放到响应拦截里
    console.log('响应路径为' + res.config.url);
    console.log(res);
    if (res.data.code != 200) {
        if(res.data.code==403){
            // 注意这里的router不用this
            router.push('/login')
            return
        }
        errorAlert(res.data.msg)
        return
    }
    console.log(res);
    return res
})
// 添加菜单
export const addMenu = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/menuadd',
        data: qs.stringify(data)
    })
}
// 展示菜单列表
export const getMenu = (params) => {
    return axios({
        method: 'get',
        url: baseUrl + '/api/menulist',
        params,

    })

}
// 获取一条菜单
export const oneMenu = (params) => {
    return axios({
        method: 'get',
        url: baseUrl + '/api/menuinfo',
        params,
    })
}
// 修改数据
export const upDateMenu = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/menuedit',
        data: qs.stringify(data)
    })
}
// 删除数据
export const delMenu = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/menudelete',
        data: qs.stringify(data)

    })
}
// 添加角色
export const addRole = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/roleadd',
        data: qs.stringify(data)

    })
}
// 获取角色列表
export const getRole = () => {
    return axios({
        method: 'get',
        url: baseUrl + '/api/rolelist'
    })
}
// 获取角色详情
export const oneRole = (params) => {
    return axios({
        method: 'get',
        url: baseUrl + '/api/roleinfo',
        params
    })
}
// 编辑角色
export const upDateRole = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/roleedit',
        data: qs.stringify(data)
    })
}
// 删除角色
export const delRole = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/roledelete',
        data: qs.stringify(data)

    })
}
// 添加管理
export const addManager = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/useradd',
        data: qs.stringify(data)

    })
}
// 获取管理员列表
export const getManager = (params) => {
    return axios({
        method: 'get',
        url: baseUrl + '/api/userlist',
        params

    })
}
// 获取管理员总数
export const getCount = () => {
    return axios({
        method: 'get',
        url: baseUrl + '/api/usercount'
    })
}
// 获取管理员详情--
export const oneManager = (params) => {
    return axios({
        method: 'get',
        url: baseUrl + '/api/userinfo',
        params
    })
}
// 修改管理员
export const upDateManager = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/useredit',
        data: qs.stringify(data)
    })
}
// 删除管理员
export const delManager = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/userdelete',
        data: qs.stringify(data)
    })
}
// 登录
export const reqLogin = (data) => {
    return axios({
        method: 'post',
        url: baseUrl + '/api/userlogin',
        data: qs.stringify(data)
    })
}
// 添加商品分类
// export const addCate=(data)=>{
//     return axios({
//         method:'post',
//         url:baseUrl+'/api/cateadd',
//         data:qs.stringify(data)
//     })
// }
// 添加商品分类1由于有文件上传所以不能用上述的方法
export const addCate = (data) => {
    var form = new FormData()
    for (let i in form) {
        form.append(i, data[i])
    }
    console.log(form);
    return axios({
        method: 'post',
        url: baseUrl + '/api/cateadd',
        data: form
    })
}
// 商品分类列表
export const getCate = (params) => {
    return axios({
        method: 'get',
        url: baseUrl + '/api/catelist',
        params
    })
}
// 获取分类详情
export const oneCate = (params) => {
    return axios({
        method: 'get',
        url: baseUrl + '/api/cateinfo',
        params
    })
}
// 修改商品分类
export const updateCate = (data) => {
    var form=new FormData()
    for(var i in data){
        form.append(i,data[i])
    }
    return axios({
        method: 'post',
        url: baseUrl + '/api/cateedit',
        data:form
    })
}
// 删除商品分类
export const delCate=(data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/catedelete',
        data:qs.stringify(data)
    })
}
// 添加规格属性
export const addspec=(data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/specsadd',
        data:qs.stringify(data)
        
    })
}
// 获取规格列表
export const getSpec=(params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/specslist',
        params
    })
}
// 获取规格属性总数
export const specCount=()=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/specscount'
    })
}
// 获取规格属性详情
export const oneSpec=(params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/specsinfo',
        params
    })
}