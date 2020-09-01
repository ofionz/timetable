import axios from 'axios';
import logger from '@/utils/logger/index.js';
import HTTP_CODES from '@/constants/httpCodes';

export default function factoryHttp(httpConfig = {}) {
  const axiosInstance = axios.create();

  return {
    async request(config) {
      try {
        return await axiosInstance.request(config);
      } catch (error) {
        logger.exception(error);
        return false;
      }
    },

    async get(url, params = null, config = {}) {
      try {
        const requestConfig = {
          ...config,
          ...{
            method: 'get',
            url,
            params
          }
        };
        const response = await axiosInstance.request(requestConfig);
        const { status, errors, data } = response;
        if (status !== HTTP_CODES.OK) {
          logger.error(`get: server status code: ${status}`);
          return false;
        }
        if (errors) {
          logger.error('get: errors', errors);
          return false;
        }
        if (!data) {
          logger.error('get: data is not found!');
          return false;
        }
        if (data.errors?.length) {
          logger.error('get: data errors', data.errors);
          return false;
        }

        return data;
      } catch (error) {
        logger.exception(error);
        return false;
      }
    },

    async post(url, params, config = {}) {
      try {
        const requestConfig = {
          ...config,
          ...{
            method: 'post',
            url,
            data: params
          }
        };
        const response = await axiosInstance.request(requestConfig);
        const { status, errors, data } = response;

        if (status !== HTTP_CODES.CREATED) {
          logger.error(`post: server status code: ${status}`);
          return false;
        }
        if (errors) {
          logger.error('post: errors', errors);
          return false;
        }
        if (!data) {
          logger.error('get: data is not found!');
          return false;
        }
        if (data.errors?.length) {
          logger.error('get: data errors', data.errors);
          return false;
        }
        return data;
      } catch (error) {
        logger.exception(error);
        return false;
      }
    },

    async put(url, params, config = {}) {
      try {
        const requestConfig = {
          ...config,
          ...{
            method: 'put',
            url,
            data: params
          }
        };
        const response = await axiosInstance.request(requestConfig);
        const { status, errors, data } = response;

        if (status !== HTTP_CODES.OK) {
          logger.error(`put: server status code: ${status}`);
          return false;
        }
        if (errors) {
          logger.error('put: errors', errors);
          return false;
        }
        if (!data) {
          logger.error('put: data is not found!');
          return false;
        }
        if (data.errors?.length) {
          logger.error('put: data errors', data.errors);
          return { errors: data.errors };
        }

        return data;
      } catch (error) {
        logger.exception(error);
        return false;
      }
    },

    async delete(url, config = {}) {
      try {
        const requestConfig = {
          ...config,
          ...{
            method: 'delete',
            url
          }
        };
        const response = await axiosInstance.request(requestConfig);

        const { status, errors, data } = response;

        if (status !== HTTP_CODES.OK) {
          logger.error(`delete: server status code: ${status}`);
          return false;
        }
        if (errors) {
          logger.error('delete: errors', errors);
          return false;
        }
        if (!data) {
          logger.error('delete: data is not found!');
          return false;
        }
        if (data.errors?.length) {
          logger.error('delete: data errors', data.errors);
          return { errors: data.errors };
        }

        return data;
      } catch (error) {
        logger.exception(error);
        return false;
      }
    }
  };
}
