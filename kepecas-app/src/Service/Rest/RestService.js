import axios from 'axios';
import CacheService from '../Cache/CacheService';

const BASEURL = 'https://lucasrobertodev.com.br/api/kepecas';

const DEFAULT_HEADERS = {
  'X-Requested-With': 'XMLHttpRequest'
}

const get = async (urlPath, headers=DEFAULT_HEADERS) => {
  try{
    let jwt = await CacheService.get('@jwt');

    let response = await axios.get(`${BASEURL}${urlPath}`, {
      withCredentials:true,
      headers: {...headers, 'Authorization':jwt}
    });

    return response;
  }catch(err){
    console.log(err);

    return {status:500}
  }
}

const post = async (urlPath, body={}, headers=DEFAULT_HEADERS) => {
  try{
    let jwt = await CacheService.get('@jwt');
    
    let response = await axios.post(`${BASEURL}${urlPath}`, body, {
      withCredentials:true,
      headers: {...headers, 'Authorization':jwt}
    });

    return response;
  }catch(err){
    console.log(err);

    return {status:500}
  }
}

const del = async (urlPath, headers=DEFAULT_HEADERS) => {
  try{
    let jwt = await CacheService.get('@jwt');
    
    let response = await axios.delete(`${BASEURL}${urlPath}`, {
      withCredentials:true,
      headers: {...headers, 'Authorization':jwt}
    });

    return response;
  }catch(err){
    console.log(err);

    return {status:500}
  }
}

const put = async (urlPath, body={}, headers=DEFAULT_HEADERS) => {
  try{
    let jwt = await CacheService.get('@jwt');
    
    let response = await axios.put(`${BASEURL}${urlPath}`, body, {
      withCredentials:true,
      headers: {...headers, 'Authorization':jwt}
    });

    return response;
  }catch(err){
    console.log(err);

    return {status:500}
  }
}

const login = async (body={}) => {
  try{
    return await post(`/auth/signin`, body);
  }catch(err){
    console.log(err);

    return {status:500}
  }
}

export {
  get,
  post,
  del,
  put,
  login
}