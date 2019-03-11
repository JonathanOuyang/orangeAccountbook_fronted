import axios from "axios";
import { Toast, Notify, Dialog } from "vant";
import Vue from "vue";
import router from "../router";
import qs from "qs";

const HOST_NAME = window.location.hostname;
const BASE_URL = `http://${HOST_NAME}:3000`;

function getToken() {
  const TOKEN = localStorage.getItem("token");
  if (!TOKEN) {
    return Dialog.confirm({
      title: "提示",
      message: "登录状态丢失，请重新登录",
      showCancelButton: false
    }).then(() => {
      router.push("/login");
    });
  }

  return TOKEN;
}

// 192.168.191.1
axios.defaults.baseURL = BASE_URL;
axios.interceptors.request.use(
  config => {
    config.showLoading && Vue.$loading.show();
    return config;
  },
  error => {
    Vue.$loading.hide();
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    //一切正常，返回数据或空对象
    Vue.$loading.hide();
    const CODE = response.data.code;
    if (CODE === "success") {
      response.config &&
        response.config.showSuccess === true &&
        Notify({
          message: response.data.summary,
          background: "#47bb51"
        });
      return response.data;
    } else if(CODE === "token_wrong") {
      return Dialog.confirm({
        title: "提示",
        message: "登录状态失效，请重新登录",
        showCancelButton: false
      }).then(() => {
        router.push("/login");
      });
    } else {
      Notify(response.data.summary);
      return;
    }
  },
  error => {
    Vue.$loading.hide();
    //未登录
    // 请求已发出，但服务器响应的状态码不在 2xx 范围内，有错误信息则弹出错误信息
    // console.log("response-error-data", error.response.data);
    //什么数据都没有，直接出错了
    // console.log("Error", error.message);
  }
);
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
   * @param {Object} [options] 请求配置
   *    @param {Boolean} [setToken] 是否需要携带token
   *    @param {Boolean} [loadingToast] 是否显示加载动画
   *    @param {Boolean} [successDialog] 是否在返回成功响应后显示提示
   */
  post: (url, params, options = {}) => {
    options.setToken === undefined && (options.setToken = true);
    options.loadingToast === undefined && (options.loadingToast = true);
    options.successDialog === undefined && (options.successDialog = false);
    options.goBack === undefined && (options.goBack = false);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        axios
          .post(url, params, {
            headers: {
              Authorization: options.setToken ? getToken() : ""
            },
            showLoading: options.loadingToast,
            showSuccess: options.successDialog
          })
          .then(
            response => {
              resolve(response);
              options.goBack && router.go(-1)
            },
            err => {
              reject(err);
            }
          );
      }, 800);
    });
  }
};
