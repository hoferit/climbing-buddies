import { Friend, FriendshipStatus, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createFriendship = async (
  userId: number,
  friendId: number,
): Promise<Friend> => {
  const friendship = await prisma.friend.create({
    data: {
      userId: userId,
      friendId: friendId,
      sentById: userId,
      receivedById: friendId,
      status: FriendshipStatus.PENDING,
    },
    include: {
      user: true,
      friend: true,
      sentBy: true,
      receivedBy: true,
    },
  });

  return friendship;
};

export const acceptFriendship = async (
  friendshipId: number,
): Promise<Friend> => {
  const updatedFriendship = await prisma.friend.update({
    where: { id: friendshipId },
    data: {
      status: FriendshipStatus.ACCEPTED,
      friendId: friendshipId, // provide the friendId to update the relationship
    },
    include: {
      user: true,
      friend: true,
      sentBy: true,
      receivedBy: true,
    },
  });

  return updatedFriendship;
};

export const rejectFriendship = async (
  friendshipId: number,
): Promise<Friend> => {
  const updatedFriendship = await prisma.friend.update({
    where: { id: friendshipId },
    data: {
      status: FriendshipStatus.REJECTED,
      friendId: friendshipId, // provide the friendId to update the relationship
    },
    include: {
      user: true,
      friend: true,
      sentBy: true,
      receivedBy: true,
    },
  });

  return updatedFriendship;
};

export const getFriendList = async (userId: number) => {
  const friends = await prisma.friend.findMany({
    where: {
      userId,
      status: 'ACCEPTED', // Assuming only accepted friendships are considered in the friend list
    },
    include: {
      friend: true,
    },
  });

  // Extract the friend data from the list
  const friendList = friends.map((friendship) => friendship.friend);

  return friendList;
};
