/**
 * request 网络请求工具
 * @author xj
 * @version 0.0.1
 * @description
 * 1, 请求格式:request('/api/test',{method:"get"})  url 和 method必有;
 * 2，上传类型需要用H5的formData对象承载,格式const formData = new FormData(); formData.append('file', file)传入data;
 * 3, post delete post fromdata 请求方式正常传入,默认请求为get;
 * 4, prefix 设置代理时开启，配合config类的proxy实现；
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
// import route from 'mock/route';
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
const showingTokenExpring = false;


/**
 * 异常处理程序
 */

const errorHandler = error => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      style: { wordBreak: 'beack-all' },
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return response;
};

/**
 * 配置常用请求格式 get  delete  post  fromdata 文件上传(upload)
 */
const request = ({ url, method, data }) => {
  switch (String(method).toLowerCase()) {
    case 'put':
      return transitionRequest(url, { method: 'put', data });
    case 'post':
      return transitionRequest(url, { method: 'post', data });
    case 'delete':
      return transitionRequest(url, { method: 'delete', params: data });
    case 'upload':
      return transitionRequest(url, { method: 'post', formData: data });
    case 'fromdata':
        return transitionRequest(url, { method: 'post', requestType: 'form', data });
    default:
        return transitionRequest(url, { params: data })
  }
}

/**
 * 配置request请求时的默认参数
 */
const transitionRequest = extend({
  errorHandler,
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  prefix: '/server', // 给所有的请求前添加参数，再config内proxy实现代理跳转
  headers: {
      // 可以放已经定义的请求头，但是要动态的改变不能放在此处，应该放在-transitionRequest.interceptors.request.use
  },
});


/**
 * request拦截器,改变请求头或url，存放session
 */
transitionRequest.interceptors.request.use((url,options)=>{
  // 通过登陆存储的数据改变请求头简单处理
  const {session}=window.localStorage.getItem('uerinfo')?JSON.parse(window.localStorage.getItem('uerinfo')):"";

  return {
    url,
    options:{
      ...options,
      headers:{
        session
      }
    }
  }
})

/**
 * response返回拦截
*/
transitionRequest.interceptors.response.use(async response=>{
  // 通过对返回的简单处理,让逻辑返回首页
  const data = await response.clone.json();
  if(!showingTokenExpring){
    showingTokenExpring=true;
    message.error('登陆超时或未登陆,请重新登陆',1,()=>{
      showingTokenExpring=false;
      localStorage.removeItem('userinfo');
      route.push('/');
    })
  }
})


export default request;
