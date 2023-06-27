import { Friend, FriendshipStatus, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createFriendship = async (
  userId: number,
  friendId: number,
): Promise<Friend> => {
  const friendship = await prisma.friend.create({
    data: {
      user: { connect: { id: userId } },
      sentBy: { connect: { id: userId } },
      receivedBy: { connect: { id: friendId } },
      status: 'PENDING', // update status to "pending"
    },
  });

  return friendship;
};

export const acceptFriendship = async (
  friendshipId: number,
): Promise<Friend> => {
  const updatedFriendship = await prisma.friend.update({
    where: { id: friendshipId },
    data: { status: FriendshipStatus.ACCEPTED }, // update status to "accepted"
  });

  return updatedFriendship;
};

export const rejectFriendship = async (
  friendshipId: number,
): Promise<Friend> => {
  const updatedFriendship = await prisma.friend.update({
    where: { id: friendshipId },
    data: { status: FriendshipStatus.REJECTED }, // update status to "rejected"
  });

  return updatedFriendship;
};
