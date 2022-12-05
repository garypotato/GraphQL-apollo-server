import JWT from 'jsonwebtoken';
import { authSuccessResArgs } from './res';

export const generateToken = (user: authSuccessResArgs) => {
  return JWT.sign(
    {
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
    },
    process.env['JWT_TOKEN']!,
    { expiresIn: '24h' }
  );
};

export const decodeToken = (token: string) => {
  return JWT.verify(token, process.env['JWT_TOKEN']!);
};
