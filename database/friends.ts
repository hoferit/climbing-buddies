import { prisma } from '@/utils/prismadb';
import { User } from '@prisma/client';

export async function acceptFriendRequest(userId: number, friendId: number) {
  // Find and update the relationship type to "friends"
  const relationship = await prisma.userRelationship.updateMany({
    where: {
      user_first_id: friendId,
      user_second_id: userId,
      type: 'pending_first_second',
    },
    data: {
      type: 'friends',
    },
  });

  if (relationship.count === 0) {
    // Relationship not found, handle the error
    throw new Error('Friend request not found');
  }
}
export async function createFriendRequest(userId: number, friendId: number) {
  // Check if the relationship already exists
  const existingRelationship = await prisma.userRelationship.findFirst({
    where: {
      OR: [
        { user_first_id: userId, user_second_id: friendId },
        { user_first_id: friendId, user_second_id: userId },
      ],
    },
  });

  if (existingRelationship) {
    // Relationship already exists, handle the error
    throw new Error('Relationship already exists');
  }

  // Create the friend request
  await prisma.userRelationship.create({
    data: {
      user_first_id: userId,
      user_second_id: friendId,
      type: 'pending_second_first',
    },
  });
}

export async function rejectFriendRequest(userId: number, friendId: number) {
  // Find and delete the relationship
  const relationship = await prisma.userRelationship.findFirst({
    where: {
      user_first_id: friendId,
      user_second_id: userId,
      type: 'pending_first_second',
    },
  });

  if (!relationship) {
    // Relationship not found, handle the error
    throw new Error('Friend request not found');
  }

  await prisma.userRelationship.deleteMany({
    where: {
      user_first_id: friendId,
      user_second_id: userId,
      type: 'pending_first_second',
    },
  });
}

export async function retrieveFriendRequests(userId: number) {
  // Find all the pending friend requests for the user
  const friendRequests = await prisma.userRelationship.findMany({
    where: {
      user_second_id: userId,
      type: 'pending_second_first',
    },
    include: {
      user_first: {
        select: {
          id: true,
          username: true,
          profilePictureUrl: true,
          climbingLevel: true,
        },
      },
    },
  });
  return friendRequests;
}

export async function retrieveFriendList(userId: number): Promise<User[]> {
  const friendList = await prisma.userRelationship.findMany({
    where: {
      user_first_id: userId,
      type: 'friends',
    },
    include: {
      user_second: true,
    },
  });

  return friendList.map((relationship) => relationship.user_second);
}

export async function removeFriend(
  userId: number,
  friendId: number,
): Promise<void> {
  await prisma.userRelationship.deleteMany({
    where: {
      user_first_id: userId,
      user_second_id: friendId,
      type: 'friends',
    },
  });
}
