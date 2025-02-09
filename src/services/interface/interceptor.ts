import axios from "axios";
import cookie from "js-cookie";
import {
  ACCESS_TOKEN_LOC,
  REFRESH_TOKEN_LOC,
} from "@/Constants/common.constants";
import { decodeAccessToken } from "@/utils/common.utils";
import { removeUserData } from "@/utils/removeUserData";
import { BASEURL, ignoretokenpaths } from "@/Constants/services.constants";
import { ProcessQueDto } from "../dto/interface.ques.dto";

let isRefreshing = false;
let failedQueue: ProcessQueDto[] = [];

const processQueue = (error: unknown, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axios.interceptors.request.use((config) => {
  const token = cookie.get(ACCESS_TOKEN_LOC);
  if (token) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

axios.defaults.headers.common = {
  "Cache-Control":
    "no-store, no-cache, max-age=0, must-revalidate, proxy-revalidate",
  Pragma: "no-cache",
  Expires: "0",
};

const refreshAccessToken = async (refreshToken: string) => {
  const setRefUrl = BASEURL + "/auth/refreshtoken";
  try {
    const response = await fetch(setRefUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }
    const data = await response.json();
    const access_token = data.access_token;
    cookie.set(ACCESS_TOKEN_LOC, access_token);
    axios.defaults.headers.common.Authorization = "Bearer " + access_token;
    processQueue(null, access_token);
    return access_token;
  } catch (error) {
    console.error("Error refreshing token:", error);
    await removeUserData();
    window.location = "/" as unknown as Location;
    processQueue(error, null);
    throw error;
  } finally {
    isRefreshing = false;
  }
};

axios.interceptors.response.use(
  (res) => res,
  async (err) => {
    const onrequest = err.config;
    const token = cookie.get(ACCESS_TOKEN_LOC);
    const refreshToken = cookie.get(REFRESH_TOKEN_LOC);

    // Ignore token handling if there's no token and it's not a path that needs the token
    if (ignoretokenpaths.includes(err.response?.config?.url)) {
      return Promise.reject(err);
    } else if (
      !ignoretokenpaths.includes(err.response?.config?.url) &&
      !token
    ) {
      window.location = "/" as unknown as Location;
      return Promise.reject(err);
    }

    // Handle 401 and 403 errors by triggering refresh token logic
    if (
      (err?.response?.status === 401 || err?.response?.status === 403) &&
      !onrequest._retry &&
      token &&
      refreshToken
    ) {
      const { decodedToken } = decodeAccessToken(token);
      const exp = decodedToken ? decodedToken.exp : null;

      // Check if the access token is expired and if we should refresh it
      if (exp && exp < Date.now() / 1000) {
        if (isRefreshing) {
          // Queue the request if refresh is in progress
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((tokens) => {
              // Retry the original request with new token
              onrequest.headers.Authorization = "Bearer " + tokens;
              return axios(onrequest);
            })
            .catch((error) => {
              return Promise.reject(error);
            });
        }

        // Mark the request as retrying and refresh the token
        onrequest._retry = true;
        isRefreshing = true;

        try {
          const access_token = await refreshAccessToken(refreshToken);
          onrequest.headers.Authorization = "Bearer " + access_token;
          return axios(onrequest);
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }

    // If none of the above conditions are met, reject the error
    return Promise.reject(err);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  del: axios.delete,
};
