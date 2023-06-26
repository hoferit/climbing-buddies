import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

type UserWithPasswordHash = {
  id: number;
  username: string;
  passwordHash: string;
  email: string;
};

export const getUserWithPasswordHashByUsername = async (
  username: string,
): Promise<UserWithPasswordHash | null> => {
  const user = await prisma.user.findUnique({
    where: {
      username: username.toLowerCase(),
    },
    select: {
      id: true,
      username: true,
      passwordHash: true,
      email: true,
    },
  });

  return user;
};

export const getUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username.toLowerCase(),
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });

  return user;
};

export const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      username: true,
      email: false,
      firstName: true,
      lastName: true,
      climbingLevel: true,
      profilePictureUrl: true,
    },
  });

  return user;
};

export async function updateUserById(
  id: number,
  data: Partial<User>,
): Promise<User | null> {
  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      climbingLevel: data.climbingLevel,
      profilePictureUrl: data.profilePictureUrl,
    },
  });

  return updatedUser;
}

export const createUser = async (
  username: string,
  passwordHash: string,
  email: string,
) => {
  const user = await prisma.user.create({
    data: {
      username: username.toLowerCase(),
      passwordHash: passwordHash,
      email: email,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });

  return user;
};

export const getUserBySessionToken = async (token: string) => {
  const user = await prisma.session.findFirst({
    where: {
      token,
      expire: {
        gt: new Date(), // find session where expiry_timestamp is greater than the current date and time
      },
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  return user?.user;
};
