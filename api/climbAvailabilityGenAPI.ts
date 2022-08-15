import api from './api';
import { AxiosPromise } from 'axios';
import { GeneralAvailabilityModel } from '../models/GeneralAvailability';
import { ClimbAvailabilityGen } from '../store/climbAvailabilityGenSlice';

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

export function getOneGenAvail(id: string) {
  return new Promise<AxiosPromise>((resolve, reject) => {
    try {
      api.get(`/climb-availability-gen/${id}`)
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

export function updateOneGenAvail(id: string, updateBody: Partial<ClimbAvailabilityGen>) {
  return new Promise<AxiosPromise>((resolve, reject) => {
    try {
      api.patch(`/climb-availability-gen/${id}`, updateBody)
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

export function deleteOneGenAvail(id: string) {
  return new Promise<AxiosPromise>((resolve, reject) => {
    try {
      api.delete(`/climb-availability-gen/${id}`)
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
