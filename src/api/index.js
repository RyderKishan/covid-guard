import { pathOr } from 'ramda';
import fetch from 'node-fetch';
import CustomException from './CustomException';

const ErrorObject = async (response) => {
  const error = {
    status: pathOr(500, ['status'], response),
    url: pathOr('', ['url'], response),
    statusText: pathOr('', ['statusText'], response)
  };
  try {
    error.data = await response.json();
  } catch (e) {
    error.empty = true;
  }
  return error;
};

const headersForAllRequest = {
  'Content-Type': 'application/json'
};

const get = async (endpoint, headers, options = {}) => {
  const commonHeaders = {
    ...headersForAllRequest
  };
  const commonOptions = {
    method: 'GET',
    ...options
  };
  const response = await fetch(endpoint, {
    ...commonOptions,
    headers: { ...commonHeaders, ...headers }
  });
  if (response.ok && response.status === 200) {
    return response.json();
  }
  const errorObject = await ErrorObject(response);
  throw new CustomException(errorObject);
};

const del = async (endpoint, headers, options = {}) => {
  const commonHeaders = {
    ...headersForAllRequest
  };
  const commonOptions = {
    method: 'DELETE',
    ...options
  };
  const response = await fetch(endpoint, {
    ...commonOptions,
    headers: { ...commonHeaders, ...headers }
  });
  if (response.ok && response.status === 200) {
    return response.json();
  }
  const errorObject = await ErrorObject(response);
  throw new CustomException(errorObject);
};

const post = async (endpoint, body, headers, options = {}) => {
  const commonHeaders = {
    ...headersForAllRequest
  };
  const commonOptions = {
    method: 'POST',
    ...options
  };
  const response = await fetch(endpoint, {
    ...commonOptions,
    body: JSON.stringify(body),
    headers: { ...commonHeaders, ...headers }
  });
  if (response.ok && response.status === 200) {
    return response.json();
  }
  const errorObject = await ErrorObject(response);
  throw new CustomException(errorObject);
};

const put = async (endpoint, body, headers, options = {}) => {
  const commonHeaders = {
    ...headersForAllRequest
  };
  const commonOptions = {
    method: 'PUT',
    ...options
  };
  const response = await fetch(endpoint, {
    ...commonOptions,
    body: JSON.stringify(body),
    headers: { ...commonHeaders, ...headers }
  });
  if (response.ok && response.status === 200) {
    return response.json();
  }
  const errorObject = await ErrorObject(response);
  throw new CustomException(errorObject);
};

export { get, post, del, put };
