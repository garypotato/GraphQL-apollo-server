import { generateToken } from './utils';

export interface authSuccessResArgs {
  id: string;
  name: string;
  email: string;
}

export const userExist = () => {
  return {
    code: 404,
    message: 'user exist',
    token: 'undefined',
  };
};

export const authSuccessRes = (user: authSuccessResArgs) => {
  return {
    code: 200,
    message: 'success',
    token: generateToken(user),
  };
};

export const userSignInFail = () => {
  return {
    code: 404,
    message: 'user/password err',
    token: 'undefined',
  };
};

export const tokenExpired = () => {
  return {
    code: 404,
    message: 'invalid token',
  };
};
