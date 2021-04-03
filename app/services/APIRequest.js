import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';

export async function getRequest(url = '') {
  let response = await fetch(url, {
    method: 'GET',
    // headers: {
    //     Cookie: Cookie
    // }
  });
  console.log(response);
  let responseJson = await response.json();
  return responseJson;
}

export async function postRequest(url = '', body = {}, headers = {}) {
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      ...headers,
    },
    body: body,
  });
  // let responseJson = await response.json();
  return response;
}

export async function putRequest(url = '', body = {}, headers = {}) {
  let response = await fetch(url, {
    method: 'PUT',
    body: body,
    headers: {
      ...headers,
    },
  });
  let responseJson = await response.json();
  return responseJson;
}
export async function deleteRequest(url = '', body = {}, headers = {}) {
  let response = await fetch(url, {
    method: 'DELETE',
    body: body,
    headers: {
      ...headers,
    },
  });
  let responseJson = await response.json();
  return responseJson;
}
