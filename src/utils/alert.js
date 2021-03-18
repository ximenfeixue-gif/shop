// 和根组件没关系，所以这里应该new一个新的vue实例
import Vue from 'vue'
const vm=new Vue()

// 成功时的提示
export const successAlert=(msg)=>{
    vm.$message({
        message:msg,
        type:'success'
    })
}

// 警告时的提示
export const warningAlert=(msg)=>{
    vm.$message({
        message:msg,
        type:'warning'
    })
}
// 错误时的提示
export const errorAlert=(msg)=>{
    vm.$message.error(msg)
}