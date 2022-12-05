import { PrismaClient } from '@prisma/client';
import { userSignUpArgs } from '../resolvers/Mutation/authResolvers';

const prisma = new PrismaClient();

export const fetchAllUser = () => {
  return prisma.user.findMany({});
};

export const findUserById = (id: string) => {
  return prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
};

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const userCreate = (user: userSignUpArgs) => {
  return prisma.user.create({
    data: {
      email: user.email,
      name: user.name,
      password: user.password,
    },
  });
};
