import { authSuccessRes, userExist, userSignInFail } from '../../service/res';
import { findUserByEmail, userCreate } from '../../service/service';
import * as bcrypt from 'bcrypt';

export interface userSignUpArgs {
  name: string;
  email: string;
  password: string;
}

interface userSignIArgs {
  email: string;
  password: string;
}

export const authResolvers = {
  userSignUp: async (_: any, { name, email, password }: userSignUpArgs, ___: any) => {
    if (await findUserByEmail(email)) {
      return userExist();
    }
    const hashPassword = bcrypt.hashSync(password, 10);

    const user = await userCreate({ name, email, password: hashPassword });

    if (!user) return userExist();

    if (user.id && user.name && user.email)
      return authSuccessRes({ id: user.id.toString(), name: user.name, email: user.email });
  },

  userSignIn: async (_: any, { email, password }: userSignIArgs, ___: any) => {
    const user = await findUserByEmail(email);
    if (!user) {
      return userSignInFail();
    }
    const isValidUser = bcrypt.compareSync(password, user.password);
    if (!isValidUser) return userSignInFail();

    return authSuccessRes({ id: user.id.toString(), name: user.name, email: user.email });
  },
};
