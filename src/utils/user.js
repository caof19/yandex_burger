export function setupUser(state, action) {
  const {user, accessToken, refreshToken} = action.payload;

  if(user) {
    state.info = {
      ...state.info,
      name: user.name,
      email: user.email,
    };
  }

  if(accessToken === undefined || refreshToken === undefined) {
    return;
  }
  state.tokens = {accessToken, refreshToken};

  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}