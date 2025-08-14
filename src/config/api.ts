import axios, { AxiosInstance } from "axios";

// Define a tipagem para a instância da API
export const api: AxiosInstance = axios.create({
  baseURL: "https://api.asaas.com/v3/",
  headers: {
    access_token: process.env.ASAAS_SECRETE_KEY,
  },
});

export const apiChatgpt: AxiosInstance = axios.create({
  baseURL: "https://api.asaas.com/v3/",
  headers: {
    access_token: process.env.OPENAI_API_KEY,
  },
});
