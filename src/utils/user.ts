import { PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../utils/types';

export function setupUser(state: TUser, action: PayloadAction<{ user?: { name: string; email: string }; accessToken?: string; refreshToken?: string }>) {
  const { user, accessToken, refreshToken } = action.payload;

  if (user) {
    state.info = {
      ...state.info,
      name: user.name,
      email: user.email,
    };
  }

  if (accessToken === undefined || refreshToken === undefined) {
    return;
  }
  state.tokens = { accessToken, refreshToken };

  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}