import axios from "axios";
import { Toast } from "vant";
import qs from "qs";

axios.defaults.baseURL = "http://localhost:3000";
//请求开始时，开启加载中动画，出错了提示并关闭动画
axios.interceptors.request.use(
  config => {
    Toast.loading({ duration: 0, forbidClick: true });
    return config;
  },
  error => {
    Toast.fail();
    Toast.clear();
    return Promise.reject(error);
  }
);

//请求完成时，关闭加载中动画，返回数据或错误信息
axios.interceptors.response.use(
  response => {
    Toast.clear();
    //一切正常，返回数据或空对象
    // if (response.data.code === 0) {
      return response.data
    // } else {
    //   //没有数据，只有提示信息，则弹出提示信息，
    //   if (response.data.text != null && response.data.text.length > 0) {
    //   }
    // }
  },
  error => {
    Toast.clear();
    //未登录
    // 请求已发出，但服务器响应的状态码不在 2xx 范围内，有错误信息则弹出错误信息
    console.log("response-error-data", error.response.data);

    //什么数据都没有，直接出错了
    console.log("Error", error.message);
  }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params)).then(
      response => {
        resolve(response);
      },
      err => {
        reject(err);
      }
    );
  });
}
