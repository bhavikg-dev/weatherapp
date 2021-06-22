/* eslint-disable prettier/prettier */
import axios from 'axios';
import { appConfig } from '@config/appConfig';
const defaultHeader = {};

const appClient = axios.create({
    baseURL: appConfig.baseAPIUrl,
    timeout: 0,
    headers: defaultHeader,
});
appClient.defaults.timeout = 0;

appClient.interceptors.request.use( async function(config) {
  console.log('Starting Request', config);
  return config;
});

appClient.interceptors.response.use(
  function(response) {
    console.log('response', response);
    return response;
  },
  function(error) {
    console.log('Request Failed:', error.config);
    return Promise.reject(error.response || error.message);
  }
);

export { appClient };
