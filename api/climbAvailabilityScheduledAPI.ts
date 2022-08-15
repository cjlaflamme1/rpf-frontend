import api from './api';
import { AxiosPromise } from 'axios';
import { ScheduledAvailabilityModel } from '../models/ScheduledAvailability';
import { ClimbAvailabilityScheduled } from '../store/climbAvailabilityScheduledSlice';

export function createScheduledAvail(genAvailDto: ScheduledAvailabilityModel) {
  return new Promise<AxiosPromise>((resolve, reject) => {
    try {
      api.post('/climb-availability-scheduled', genAvailDto)
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

export function getAllScheduledAvail() {
  return new Promise<AxiosPromise>((resolve, reject) => {
    try {
      api.get('/climb-availability-scheduled')
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

export function getOneScheduledAvail(id: string) {
  return new Promise<AxiosPromise>((resolve, reject) => {
    try {
      api.get(`/climb-availability-scheduled/${id}`)
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

export function updateOneScheduledAvail(id: string, updateBody: Partial<ClimbAvailabilityScheduled>) {
  return new Promise<AxiosPromise>((resolve, reject) => {
    try {
      api.patch(`/climb-availability-scheduled/${id}`, updateBody)
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

export function deleteOneScheduledAvail(id: string) {
  return new Promise<AxiosPromise>((resolve, reject) => {
    try {
      api.delete(`/climb-availability-scheduled/${id}`)
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
