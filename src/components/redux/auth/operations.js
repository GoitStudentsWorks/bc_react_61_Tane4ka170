import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const expenseApi = axios.create({
  baseURL: 'https://expense-tracker.b.goit.study/api/',
});

const setToken = token => {
  expenseApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const clearToken = () => {
  expenseApi.defaults.headers.common.Authorization = '';
};

export const registerThunk = createAsyncThunk(
  'register',
  async (credential, thunkApi) => {
    try {
      const { data } = await expenseApi.post('auth/register', credential);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'login',
  async (credential, thunkApi) => {
    try {
      const { data } = await expenseApi.post('auth/login', credential);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk('logout', async (_, thunkApi) => {
  try {
    await expenseApi.post('auth/logout');
    clearToken();
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const refreshThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    const savedToken = thunkApi.getState().auth.token;

    if (!savedToken) {
      return thunkApi.rejectWithValue('Token is not exist');
    }
    try {
      setToken(savedToken);
      const { data } = await expenseApi.get('auth/current');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);