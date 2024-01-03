import axios from 'axios';
import { useBotStore } from '@/store/bot';

// 业务请求
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
});

// request interceptor
request.interceptors.request.use(
  (config) => {
    // // do something before request is sent
    // const userStore = useUserStore();

    // if (userStore.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['authorization'] = userStore.token;
    //   config.headers['userId'] = userStore.userInfo.id;
    // }
    return config;
  },
  (error) => {
    console.log('🚀 ~ file: request.js:27 ~ error:', error);
    // do something with request error
    return Promise.reject(error);
  }
);

// response interceptor
request.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const { code, data, msg } = response.data;

    const botStore = useBotStore();

    if (code === 2000) {
      return Promise.resolve(data);
    } else {
      if (code === 5003) {
        botStore.setProcessStatus({ processStatus: false });
      }
      if (code === 4001) {
        botStore.setProcessStatus({ processStatus: true });
      }
      return Promise.reject(msg);
    }
  },
  (error) => {
    console.log('🚀 ~ file: request.js:80 ~ error:', error);

    return Promise.reject(error);
  }
);

export { request };
