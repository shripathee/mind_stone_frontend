import { AUTH_TOKEN_LOCAL_STORAGE_KEY } from '../constants';

function isSuccess(status) {
  return status >= 200 && status < 300;
}

function checkStatus(response) {
  if (response) {
    let { status } = response;
    if (isSuccess(status)) {
      if (response.headers.get('Content-Type') === 'application/json') {
        return response.json();
      } else {
        return response.text();
      }
    } else {
      const responsePromise = response.headers.get('Content-Type') === 'application/json' ? response.json() : response.text();
      return responsePromise.then((payload) => {
        return Promise.reject(payload);
      });
    }
  } else {
    return Promise.reject('Bad request');
  }
}

async function sendRequest(url, type, data) {
  let token = localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  if (token) {
    headers.Authorization = `Token ${token}`;
  }
  let requestBody = {
    method: type,
    headers
  };
  if (data) {
    requestBody.body = JSON.stringify(data);
  }
  return fetch(url, requestBody).then(checkStatus);
}

export { sendRequest };