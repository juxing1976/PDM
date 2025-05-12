
import axios from 'axios'; 

// 创建 axios 实例 
export const api = axios.create({ 
  baseURL: process.env.REACT_APP_API_BASE_URL, // 从环境变量中获取 API 基础 URL 
  timeout: 10000, // 请求超时时间 
}); 
 
// 封装 GET 请求 
export const get = async (url: string) => { 
  try { 
    const response = await api.get(url); 
    return response; 
  } catch (error) { 
    console.error('API 请求错误:', error); 
    throw error; 
  } 
}; 
 
// 封装 POST 请求 
export const post = async (url: string, data: any) => { 
  try { 
    const response = await api.post(url, data); 
    return response; 
  } catch (error) { 
    console.error('API 请求错误:', error); 
    throw error; 
  } 
}; 
 
// 封装 PUT 请求 
export const put = async (url: string, data: any) => { 
  try { 
    const response = await api.put(url, data); 
    return response; 
  } catch (error) { 
    console.error('API 请求错误:', error); 
    throw error; 
  } 
}; 
 
// 封装 DELETE 请求 
export const del = async (url: string) => { 
  try { 
    const response = await api.delete(url); 
    return response; 
  } catch (error) { 
    console.error('API 请求错误:', error); 
    throw error; 
  } 
}; 