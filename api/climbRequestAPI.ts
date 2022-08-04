import api from './api';
import { AxiosPromise } from 'axios';
import { ClimbRequest, CreateClimbRequestDTO } from '../store/climbRequestSlice';

export function createClimbRequest(climbRequestDto: CreateClimbRequestDTO) {
  return new Promise<AxiosPromise>((resolve, reject) => {
    try {
      api.post('/climb-request', climbRequestDto)
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

export function getAllClimbRequests() {
  return new Promise<AxiosPromise>((resolve, reject) => {
    try {
      api.get('/climb-request')
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

export function getOneClimbRequest(id: string) {
  return new Promise<AxiosPromise>((resolve, reject) => {
    try {
      api.get(`/climb-request/${id}`)
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

export function updateOneClimbRequest(id: string, updateBody: Partial<ClimbRequest>) {
  return new Promise<AxiosPromise>((resolve, reject) => {
    try {
      api.patch(`/climb-request/${id}`, updateBody)
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
