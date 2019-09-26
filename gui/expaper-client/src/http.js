import axios from 'axios'
import { Message, Loading } from 'element-ui';

let loading;
function startLoading() {
loading=Loading.service({
    lock:true,
    text:'loading ... ',
    background:'rgba(0,0,0,0.7)'

})
}

function endLoading() {
    loading.close()
}
//请求拦截
axios.interceptors.request.use(config=>{
    //加载动画
    startLoading();
    return config;
},error => {
    return Promise.reject(error)
});


//res拦截,拦截器interceptors
axios.interceptors.response.use(res=>{
    endLoading();
    return res;
},error => {
    //提醒
    endLoading();
    Message.error(error.response.data);
    return Promise.reject(error);
});
export default axios;