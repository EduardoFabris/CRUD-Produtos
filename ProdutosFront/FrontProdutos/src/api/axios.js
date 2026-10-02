import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5219/api"
});

api.interceptors.request.use((config) => {
    console.log("Antes da Requisição");

    return config;
});

api.interceptors.response.use(
    (response) => {
        console.log("Antes da Resposta");

        return response;
    },
    (error) => {
        console.log("Erro na resposta:", error);

        return Promise.reject(error);
    }
);

export default api; 