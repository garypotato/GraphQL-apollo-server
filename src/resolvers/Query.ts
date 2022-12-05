import { fetchAllUser, findUserByEmail, findUserById } from '../service/service';

interface userArgs {
  userId: string;
}

export const Query = {
  user: (_: any, { userId }: userArgs, ___: any) => {
    return findUserById(userId);
  },
  allUsers: () => {
    return fetchAllUser();
  },
  me: (_: any, __: any, { user }: any) => {
    return findUserByEmail(user.userEmail);
  },
};
