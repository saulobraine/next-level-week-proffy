import axios from 'axios';

const api = axios.create({
  baseURL: 'https://saulobraine-proffy-server.herokuapp.com'
});

export default api;