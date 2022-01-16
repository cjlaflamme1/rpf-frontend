import api from './api';
import { AxiosPromise } from 'axios';
import { SignupObject } from '../models/SignupObject';

export function signUp(newUser: SignupObject) {
  return new Promise<AxiosPromise>((resolve, reject) => {
    try {
      api
        .post('auth/signup', newUser)
        .then((response: any) => {
          resolve(response);
        })
        .catch((e: Error) => {
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
};