import api from './api';
import { AxiosPromise } from 'axios';

export function getCurrentUser() {
  return new Promise<AxiosPromise>((resolve, reject) => {
    try {
      api.get('/user')
        .then((response: any) => {
          resolve(response);
        })
        .catch((e: Error) => {
          reject(e);
        })
    } catch (e) {
      reject(e);
    }
  })
}
