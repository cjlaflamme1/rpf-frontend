import api from './api';
import { AxiosPromise } from 'axios';
import { ClimbMessage, CreateClimbMeetupDTO, CreateClimbMessageDTO } from '../store/climbMeetupSlice';

export function createClimbMessage(climbMessageDto: CreateClimbMessageDTO) {
  return new Promise<AxiosPromise>((resolve, reject) => {
    try {
      api.post('/climb-message', climbMessageDto)
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

export function updateClimbMessage(id: string, updateBody: Partial<ClimbMessage>) {
  return new Promise<AxiosPromise>((resolve, reject) => {
    try {
      api.patch(`/climb-message/${id}`, updateBody)
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

export function createClimbMeetup(climbMeetupDto: CreateClimbMeetupDTO) {
  return new Promise<AxiosPromise>((resolve, reject) => {
    try {
      api.post('/climb-meetup', climbMeetupDto)
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

export function getAllClimbMeetups() {
  return new Promise<AxiosPromise>((resolve, reject) => {
    try {
      api.get('/climb-meetup')
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

export function getOneClimbMeetup(id: string) {
  return new Promise<AxiosPromise>((resolve, reject) => {
    try {
      api.get(`/climb-meetup/${id}`)
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
