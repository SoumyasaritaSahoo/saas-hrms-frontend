import axios from "axios";
import Cookies from "universal-cookie";
import { paths, getLocalizedPath } from "@/path";

const cookies = new Cookies();


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  withCredentials: true, // sends session cookie automatically
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "client-type": "web", // required by NestJS AppMiddleware
  },
});

// ─── Multi-tenant: company-id header — set by CompanyProvider ──────
let _companyId: string | number | null = null;
export const setAxiosCompanyId = (id: string | number | null) => {
  _companyId = id;
};

api.interceptors.request.use((config) => {
  if (_companyId) {
    config.headers["company-id"] = String(_companyId);
  }
  return config;
});

export default api;

// ─── Shared response shape ────────────────────────────────────────
export interface ApiResponse<T = any> {
  status: boolean;
  data?: T;
  message?: string;
}

// ─── Get current lang from cookie/localStorage ───────────────────
const getLang = (): string => {
  if (typeof window === "undefined") return "en";
  return localStorage.getItem("locale") ?? "en";
};

// ─── Handle successful response ──────────────────────────────────
const handleResponse = <T>(response: any): T => response.data;

// ─── Handle error response ───────────────────────────────────────
const handleError = <T>(error: any): T => {
  const status = error.response?.status;
  const data = error.response?.data;
  const lang = getLang();
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";

  if (status === 401) {
    // Session expired — clear auth cookie and redirect to login
    if (!pathname.includes(paths.auth.login)) {
      cookies.remove("isAuth", {
        path: "/",
        domain: process.env.NEXT_PUBLIC_SESSION_DOMAIN?.replace(/"/g, ""),
      });
      window.location.href = getLocalizedPath(paths.auth.login, lang);
    }
  }

  if (status === 403) {
    // No permission
    if (!pathname.includes(paths.notAuthorized)) {
      window.location.href = getLocalizedPath(paths.notAuthorized, lang);
    }
  }

  return data;
};


const getHeaders = (
  extraHeader?: Record<string, string>,
): Record<string, string> => {
  const base: Record<string, string> = {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "client-type": "web",
  };

  if (extraHeader) Object.assign(base, extraHeader);

  return base;
};

// ─── GET ──────────────────────────────────────────────────────────
export const getWithAuthToken = async <T>(
  url: string,
  extraHeader?: Record<string, string>,
): Promise<ApiResponse<T>> => {
  try {
    const headers = getHeaders(extraHeader);
    const response = await api.get<T>(url, { headers });

    return { status: true, data: handleResponse<T>(response) };
  } catch (ex: any) {
    return { status: false, message: handleError(ex) };
  }
};

// ─── POST (public — login, forgot-password) ───────────────────────
// No active session needed, but still needs client-type header
export const post = async <T>(
  url: string,
  entity: any,
  extraHeader?: Record<string, string>,
): Promise<ApiResponse<T>> => {
  try {
    const headers = getHeaders(extraHeader);
    const response = await api.post<T>(url, entity, { headers });

    return { status: true, data: handleResponse<T>(response) };
  } catch (ex: any) {
    return { status: false, message: handleError(ex) };
  }
};

// ─── POST (protected — requires active session) ───────────────────
export const postWithAuthToken = async <T>(
  url: string,
  entity: any,
  extraHeader?: Record<string, string>,
): Promise<ApiResponse<T>> => {
  try {
    const headers = getHeaders(extraHeader);
    const response = await api.post<T>(url, entity, { headers });

    return { status: true, data: handleResponse<T>(response) };
  } catch (ex: any) {
    return { status: false, message: handleError(ex) };
  }
};

// ─── PUT ──────────────────────────────────────────────────────────
export const putWithAuthToken = async <T>(
  url: string,
  entity: any,
  extraHeader?: Record<string, string>,
): Promise<ApiResponse<T>> => {
  try {
    const headers = getHeaders(extraHeader);
    const response = await api.put<T>(url, entity, { headers });

    return { status: true, data: handleResponse<T>(response) };
  } catch (ex: any) {
    return { status: false, message: handleError(ex) };
  }
};

// ─── PATCH ────────────────────────────────────────────────────────
export const patchWithAuthToken = async <T>(
  url: string,
  entity: any,
  extraHeader?: Record<string, string>,
): Promise<ApiResponse<T>> => {
  try {
    const headers = getHeaders(extraHeader);
    const response = await api.patch<T>(url, entity, { headers });

    return { status: true, data: handleResponse<T>(response) };
  } catch (ex: any) {
    return { status: false, message: handleError(ex) };
  }
};

// ─── DELETE ───────────────────────────────────────────────────────
export const deleteWithAuthToken = async <T>(
  url: string,
  extraHeader?: Record<string, string>,
): Promise<ApiResponse<T>> => {
  try {
    const headers = getHeaders(extraHeader);
    const response = await api.delete<T>(url, { headers });

    return { status: true, data: handleResponse<T>(response) };
  } catch (ex: any) {
    return { status: false, message: handleError(ex) };
  }
};

// ─── POST form-data (file uploads) ───────────────────────────────
export const postFormData = async <T>(
  url: string,
  data: FormData,
  extraHeader?: Record<string, string>,
): Promise<ApiResponse<T>> => {
  try {
    const headers = getHeaders({
      "Content-Type": "multipart/form-data",
      ...extraHeader,
    });
    const response = await api.post<T>(url, data, { headers });

    return { status: true, data: handleResponse<T>(response) };
  } catch (ex: any) {
    return { status: false, message: handleError(ex) };
  }
};

// ─── PUT form-data (file uploads) ────────────────────────────────
export const putFormData = async <T>(
  url: string,
  data: FormData,
  extraHeader?: Record<string, string>,
): Promise<ApiResponse<T>> => {
  try {
    const headers = getHeaders({
      "Content-Type": "multipart/form-data",
      ...extraHeader,
    });
    const response = await api.put<T>(url, data, { headers });

    return { status: true, data: handleResponse<T>(response) };
  } catch (ex: any) {
    return { status: false, message: handleError(ex) };
  }
};
