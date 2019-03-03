import axios from 'axios'
import { Toast, Notify, Dialog } from 'vant'
import Loading from "../components/loading/loading";
import router from '../router'
import qs from 'qs'

const BASE_URL = 'http://localhost:3000'
const API_NO_TOKEN = {
  'users/login': 1,
  'users/register': 1,
}

// 192.168.191.1
axios.defaults.baseURL = BASE_URL
//请求开始时，开启加载中动画，出错了提示并关闭动画
axios.interceptors.request.use(
  config => {
    const TOKEN = localStorage.getItem('token')
    const TOKEN_EXP = localStorage.getItem('token_exp')
    // Toast.loading({
    //   duration: 0,
    //   forbidClick: true,
    //   mask: true,
    //   message: "加载中"
    // });
    if (!API_NO_TOKEN[config.url]) {
      if (new Date().getTime() > TOKEN_EXP) {
        return Dialog.confirm({
          title: '提示',
          message: '登录状态过期，请重新登录',
          showCancelButton: false,
        }).then(() => {
          localStorage.removeItem('token')
          localStorage.removeItem('token_exp')
          router.push('/login')
        })
      }

      if (!TOKEN) {
        return Dialog.confirm({
          title: '提示',
          message: '登录状态失效，请重新登录',
          showCancelButton: false,
        }).then(() => {
          router.push('/login')
        })
      }
      config.headers.common['Authorization'] = TOKEN
    }
    return config
  },
  error => {
    Toast.fail()
    Toast.clear()
    return Promise.reject(error)
  }
)

//请求完成时，关闭加载中动画，返回数据或错误信息
axios.interceptors.response.use(
  response => {
    Toast.clear()
    //一切正常，返回数据或空对象
    if (response.data.code === 'success') {
      return response
    } else {
      Notify(response.data.summary)
      return
    }
  },
  error => {
    Toast.clear()
    //未登录
    // 请求已发出，但服务器响应的状态码不在 2xx 范围内，有错误信息则弹出错误信息
    // console.log("response-error-data", error.response.data);

    //什么数据都没有，直接出错了
    // console.log("Error", error.message);
  }
)

export default {
  /**
   * get方法，对应get请求
   * @param {String} [url] 请求的url地址
   * @param {Object} [params] 请求时携带的参数
   */
  get: (url, params) => {
    return new Promise((resolve, reject) => {
      axios
        .get(url, params)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },

  /**
   * post方法，对应post请求
   * @param {String} [url] 请求的url地址
   * @param {Object} [params] 请求时携带的参数
   */
  post: (url, params) => {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(
        response => {
          resolve(response);
        },
        err => {
          reject(err);
        }
      );
    });
  }
};
