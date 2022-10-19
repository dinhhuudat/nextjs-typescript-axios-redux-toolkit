import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

// axios.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     const key = process.env.apiKey;
//     if (key) {
//       config.headers = {
//         "x-access-token": key,
//       };
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

const request = async (url: string, options: AxiosRequestConfig = {}) => {
  try {
    const res: AxiosResponse = await axios({
      method: "GET",
      url,
      baseURL: process.env.API_URL,
      ...options,
    });
    return res.data;
  } catch (err) {
    const { response } = err as AxiosError;
    if (response && response.status) {
      if (response.data instanceof Blob) {
      } else {
        console.log({
          message: `Error ${response.status}:`,
        });
        
      }
    }
    throw err;
  }
};

export default request;
