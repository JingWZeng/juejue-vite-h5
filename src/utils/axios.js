import axios from "axios";
import {Toast} from "zarm";

const MODE = import.meta.env.MODE //环境变量，环境变量的作用就是判断当前代码运行在开发环境还是生产环境。
axios.defaults.baseURL = MODE === 'development' ? '/api' :'http://api.chennick.wang'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['Authorization'] = `${localStorage.getItem('token') || null}`
axios.defaults.headers.post['Content-Type'] = 'application/json'
    //响应拦截
axios.interceptors.response.use(res=>{
        if(typeof res.data !=='object'){
            Toast.show('服务端异常!')
            return Promise.reject(res)
        }
        if(res.data.code !== 200){
            res.data.msg && Toast.show(res.data.msg)
            if(res.data.code === 401){// 没有登录的用户
                window.location.href = '/login'
            }
            return Promise.reject(res.data)
        }
        return res.data
})
export default axios

