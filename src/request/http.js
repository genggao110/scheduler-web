import axios from "axios";
import sf from "string-format";
import { Loading } from "element-ui";
import config from "@/config";
import store from "@/store";
import router from "../router";
import { ResError } from "@/lib/error/ResError";

const baseRequestUrl = config.apiURL;

const axiosInstance = axios.create({
  baseURL: baseRequestUrl,
  timeout: 200000
});

axiosInstance.interceptors.request.use(
  config => {
    if (config.loading === true) {
      Loading.service();
    }
    if (localStorage.getItem("token")) {
      config.headers.Authorization = localStorage.getItem("token");
    }
    return config;
  },
  error => {
    //前台捕获的错误
    if (error.config.loading == true) {
      Loading.service().close();
    }
    return Promise.error(error);
  }
);

axiosInstance.interceptors.response.use(
  res => {
    if (res.config.loading === true) {
      Loading.service().close();
    }
    //身份异常
    if (
      res.data.code == -4 || //NO_TNO_TOKENOKEN
      res.data.code == -5 || //TOKEN_WRONG
      res.data.code == -6 || // USER_PASSWORD_NOT_MATCH
      res.data.code == -11 // TOKEN_EXPIRED
    ) {
      store.dispatch("User/handleLogOut");
      router.push({
        name: "login"
      });
    }

    if (res.data.code < 0) {
      throw new ResError(res.data.msg);
    }
    return Promise.resolve(res.data.data);
  },
  error => {
    //后台未捕获的错误
    if (error.config.loading == true) {
      Loading.service.close();
    }
    //throw new ResError("请求服务器失败，请检查服务器是否正常运行");
    return Promise.reject("请求服务器失败，请检查服务器是否正常运行");
  }
);

export const baseUrl = baseRequestUrl;

export const get = (url, params, pathVariable = null, loading = true) => {
  return axiosInstance.get(sf(url, pathVariable), {
    params: params,
    loading
  });
};

export const postFile = (url, data, pathVariable = null, loading = true) =>
  axiosInstance.post(sf(url, pathVariable), data, {
    loading,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

export const post = (url, data, pathVariable = null, loading = true) =>
  axiosInstance.post(sf(url, pathVariable), data, {
    loading
  });

export const postJson = (url, data, pathVariable = null, loading = true) =>
  axiosInstance.post(sf(url, pathVariable), data, {
    loading,
    headers: {
      "Content-Type": "application/json"
    }
  });

export const put = (url, data, pathVariable = null, loading = true) =>
  axiosInstance.put(sf(url, pathVariable), data, {
    loading
  });

export const patch = (url, data, pathVariable = null, loading = true) =>
  axiosInstance.patch(sf(url, pathVariable), data, {
    loading
  });

export const del = (url, params, pathVariable = null, loading = true) =>
  axiosInstance.delete(sf(url, pathVariable), {
    params: params,
    loading
  });
