import axios from "axios";
const serviceClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

serviceClient.interceptors.request.use(
  (config: any) => {
    const customHeaders = {};
    return {
      ...config,
      headers: {
        ...customHeaders, // auto attach token
        ...config.headers, // but you can override for some requests
      },
    };
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default serviceClient;
