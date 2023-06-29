import { prisma } from '@/utils/prismadb';
import { Friend, FriendshipStatus } from '@prisma/client';

export const createFriendship = async (
  userId: number,
  friendId: number,
): Promise<Friend | null> => {
  try {
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
  } catch (error) {
    return null;
  }
};

export const acceptFriendship = async (
  friendshipId: number,
): Promise<Friend | null> => {
  try {
    const updatedFriendship = await prisma.friend.update({
      where: { id: friendshipId },
      data: {
        status: FriendshipStatus.ACCEPTED,
      },
      include: {
        user: true,
        friend: true,
        sentBy: true,
        receivedBy: true,
      },
    });

    return updatedFriendship;
  } catch (error) {
    return null;
  }
};

export const rejectFriendship = async (
  friendshipId: number,
): Promise<Friend | null> => {
  try {
    const updatedFriendship = await prisma.friend.update({
      where: { id: friendshipId },
      data: {
        status: FriendshipStatus.REJECTED,
      },
      include: {
        user: true,
        friend: true,
        sentBy: true,
        receivedBy: true,
      },
    });

    return updatedFriendship;
  } catch (error) {
    return null;
  }
};

export const removeFriend = async (
  userId: number,
  friendId: number,
): Promise<void> => {
  try {
    await prisma.friend.deleteMany({
      where: {
        userId,
        friendId,
      },
    });
  } catch (error) {
    throw new Error('Failed to remove friend');
  }
};

export const getFriendList = async (userId: number) => {
  try {
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
  } catch (error) {
    return null;
  }
};

export const getFriendRequestsByUserId = async (userId: number) => {
  try {
    const friendRequests = await prisma.friend.findMany({
      where: {
        receivedById: userId,
        status: 'PENDING',
      },
      include: {
        sentBy: true,
      },
    });

    // Extract the friend request data from the list
    const friendRequestList = friendRequests.map(
      (friendRequest) => friendRequest.sentBy,
    );

    return friendRequestList;
  } catch (error) {
    return null;
  }
};
