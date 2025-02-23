import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {BASE_URL} from "../utils/const.js";
import {checkResponse} from "../utils/network.js";
import {setupUser} from "../utils/user.js";


const initialState = {
    info: {
      name: '',
      email: '',
      lastURL: '',
    },
    tokens: {
      accessToken: '',
      refreshToken: '',
    }
  };
export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setLastURL: (state, action) => {
      state.info.lastURL = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnAuth.fulfilled, setupUser)
      .addCase(fetchWithTokenRefresh.fulfilled, setupUser)
      .addCase(fetchExit.fulfilled, (state, action) => {
        state.info = initialState.info;
      })
  },
})

export const fetchUnAuth = createAsyncThunk(
  'User/fetchUnAuth',
  async ({userData, endpoint}, {rejectWithValue}) => {
    try {
      return await fetch(BASE_URL+endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }).then(checkResponse);

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)
export const fetchWithTokenRefresh = createAsyncThunk(
  'User/fetchWithTokenRefresh',
  async ({userData ,endpoint, method},  {rejectWithValue}) => {
    try {
      const args = {
        method: method || 'GET',
        headers: {
          "Content-Type": "application/json",
          'authorization': localStorage.getItem('accessToken')
        }
      };
      if(userData) {
        args.body = JSON.stringify(userData);
      }

      let response = await fetch(BASE_URL+endpoint, args ).then(checkResponse);

      if(!response.success && response.message === 'jwt expired') {
        await fetch(BASE_URL+'/auth/token', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({  token: localStorage.getItem('refreshToken')})
        }).then(checkResponse).then(resp => {
          /*
          * не знаю, считается ли это редьюсером, но отсюда вроде нет вариантов вынести
          * потому что обновление токенов должно происходить после окончания запроса
          * Потому что результат его работы использует следующий запрос
          * А от того что я это вынесу в функцию, которая будет лежать в другом файле
          * разницы то нет, но могу ошибаться
          */
          localStorage.setItem('accessToken', resp.accessToken);
          localStorage.setItem('refreshToken', resp.refreshToken);
        });

        response = await fetch(BASE_URL+endpoint, {
        method: method || 'GET',
        headers: {
          "Content-Type": "application/json",
          'authorization': localStorage.getItem('accessToken')
        },
      }).then(checkResponse);
      }


      return response;

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const fetchExit = createAsyncThunk(
  'User/fetchExit',
  async (_, {rejectWithValue}) => {
    try {
      return await fetch(BASE_URL+'/auth/logout', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({  token: localStorage.getItem('refreshToken')})
      }).then(checkResponse);

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)



export const {setLastURL} = UserSlice.actions;

export default UserSlice.reducer;