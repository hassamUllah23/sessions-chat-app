import axios, {
  AxiosResponse,
  InternalAxiosRequestConfig,
  RawAxiosRequestHeaders,
} from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ADDRESS + "/",
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  console.log(
    "import.meta.env.VITE_BACKEND_ADDRESS: ",
    import.meta.env.VITE_BACKEND_ADDRESS,
  );
  const configLocal = { ...config };
  const token: string | null = localStorage.getItem("token");
  if (token && configLocal.headers) {
    configLocal.headers.Authorization = `Bearer ${token}`;
  }
  return configLocal;
});

async function GET<T>(
  url: string,
  params?: T,
  headers?: RawAxiosRequestHeaders,
): Promise<AxiosResponse | null> {
  return await instance.get(url, { params, headers });
}

async function POST<T>(
  url: string,
  data?: T,
  headers?: RawAxiosRequestHeaders,
): Promise<AxiosResponse | null> {
  return await instance.post(url, data, { headers });
}

async function PATCH<T>(
  url: string,
  data?: T,
  headers?: RawAxiosRequestHeaders,
): Promise<AxiosResponse | null> {
  return await instance.patch(url, data, { headers });
}

export { GET, POST, PATCH };
