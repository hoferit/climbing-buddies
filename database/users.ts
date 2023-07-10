import { User } from '@prisma/client';
import { prisma } from '../utils/prismadb';

type UserWithPasswordHash = {
  id: number;
  username: string;
  passwordHash: string;
  email: string;
};

export const getUserWithPasswordHashByUsername = async (
  username: string,
): Promise<UserWithPasswordHash | null> => {
  try {
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
  } catch (error) {
    return null;
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username.toLowerCase(),
      },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        climbingLevel: true,
        profilePictureUrl: true,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: number) => {
  try {
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
  } catch (error) {
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        climbingLevel: true,
        profilePictureUrl: true,
      },
    });

    return users;
  } catch (error) {
    return null;
  }
};

export async function updateUserById(
  id: number,
  data: Partial<User>,
): Promise<User | null> {
  try {
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
  } catch (error) {
    return null;
  }
}

export const createUser = async (
  username: string,
  passwordHash: string,
  email: string,
) => {
  try {
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
  } catch (error) {
    return null;
  }
};

export async function searchUsersByUsername(username: string) {
  const users = await prisma.user.findMany({
    where: {
      username: {
        contains: username,
      },
    },
    select: {
      id: true,
      username: true,
      firstName: true,
      lastName: true,
      climbingLevel: true,
      profilePictureUrl: true,
    },
  });

  return users;
}

export const getUserBySessionToken = async (token: string) => {
  try {
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
  } catch (error) {
    return null;
  }
};
