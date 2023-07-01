import { prisma } from '../utils/prismadb';

export const deleteExpiredSessions = async () => {
  await prisma.session.deleteMany({
    where: {
      expire: {
        lt: new Date(), // delete all sessions where expire is less than the current date and time
      },
    },
  });
};

export const createSession = async (token: string, userId: number) => {
  try {
    const expire = new Date();
    expire.setHours(expire.getHours() + 24); // add 24 hours to the current time

    const session = await prisma.session.create({
      data: {
        token,
        userId,
        expire,
      },
    });

    // delete all sessions that are expired
    await deleteExpiredSessions();

    return session;
  } catch (error) {
    return null;
  }
};

export const deleteSessionByToken = async (token: string) => {
  try {
    const session = await prisma.session.deleteMany({
      where: {
        token,
      },
    });

    return session;
  } catch (error) {
    return null;
  }
};

export const getValidSessionByToken = async (token: string) => {
  try {
    const session = await prisma.session.findFirst({
      where: {
        token,
        expire: {
          gt: new Date(), // find session where expire is greater than the current date and time
        },
      },
    });

    return session;
  } catch (error) {
    return null;
  }
};
