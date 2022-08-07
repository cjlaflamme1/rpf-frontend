import api from './api';
import axios, { AxiosPromise } from 'axios';
const s3Api = axios.create();
export function getPresignedUrl(fileName: string) {
  return new Promise<AxiosPromise>((resolve, reject) => {
    try {
      api.get(`/image/${fileName}`)
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

export function postPresignedUrl(imageData: { fileName: string; fileType: string}) {
  return new Promise<AxiosPromise>((resolve, reject) => {
    try {
      api.post('/image', imageData)
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

export function putImageOnS3(preAuthURL: any, image: File) {
  return new Promise<AxiosPromise>((resolve, reject) => {
    try {
      s3Api.defaults.headers.common['Content-Type'] = image.type;
      s3Api.defaults.headers.put['Content-Type'] = image.type;
      s3Api.put(preAuthURL, image, {
        headers: {
          'accept': image.type,
          'content-type': image.type,
        }
      })
        .then((response: any) => {
          console.log(response);
          resolve(response);
        })
        .catch((e: Error) => {
          reject(e);
        });
    } catch (e) {
      reject(e);
    }
  });
}