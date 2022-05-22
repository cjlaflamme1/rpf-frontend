import api from './api';
import { AxiosPromise } from 'axios';
import { GeneralAvailabilityModel } from '../models/GeneralAvailability';

export function createGenAvail(genAvailDto: GeneralAvailabilityModel) {
  return new Promise<AxiosPromise>((resolve, reject) => {
    try {
      api.post('/climb-availability-gen', genAvailDto)
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
};

export function getAllGenAvail() {
  return new Promise<AxiosPromise>((resolve, reject) => {
    try {
      api.get('/climb-availability-gen')
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
};
