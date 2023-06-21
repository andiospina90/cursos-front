import axios from 'axios';

const BASE_URL = 'https://cursos.fly.dev/api/'; // Reemplaza con tu URL base de la API
//const BASE_URL = 'http://localhost/prueba/public/api/'; // Reemplaza con tu URL base de la API

const api = axios.create({
  baseURL: BASE_URL,
});

export const get = async (url) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw new Error(`Error al realizar la solicitud GET a ${url}: ${error.message}`);
  }
};

export const post = async (url, data) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    throw new Error(`Error al realizar la solicitud POST a ${url}: ${error.message}`);
  }
};

export const put = async (url, data) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    throw new Error(`Error al realizar la solicitud PUT a ${url}: ${error.message}`);
  }
};

export const del = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    throw new Error(`Error al realizar la solicitud DELETE a ${url}: ${error.message}`);
  }
};