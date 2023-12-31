import { User } from '@prisma/client';
import { prisma } from '../utils/prismadb';

export async function acceptFriendRequest(userId: number, friendId: number) {
  // Find and update the relationship type to "friends"

  try {
    const relationship = await prisma.userRelationship.findFirst({
      where: {
        OR: [
          {
            user_first_id: friendId,
            user_second_id: userId,
          },
          {
            user_first_id: userId,
            user_second_id: friendId,
          },
        ],
      },
    });

    if (!relationship) {
      // Relationship not found, handle the error
      throw new Error('Friend request not found');
    }
    // Additional condition to check if the type matches
    if (
      relationship.type !== 'pending_first_second' &&
      relationship.type !== 'pending_second_first'
    ) {
      throw new Error('Invalid relationship type');
    }

    // Update the relationship type to "friends"

    await prisma.userRelationship.update({
      where: { id: relationship.id },
      data: { type: 'friends' },
    });
  } catch (error) {
    console.error('Error updating relationship:', error);
    throw error;
  }
}

export async function rejectFriendRequest(userId: number, friendId: number) {
  try {
    const relationship = await prisma.userRelationship.findFirst({
      where: {
        OR: [
          {
            user_first_id: friendId,
            user_second_id: userId,
          },
          {
            user_first_id: userId,
            user_second_id: friendId,
          },
        ],
      },
    });

    if (!relationship) {
      throw new Error('Friend request not found');
    }

    // Additional condition to check if the type matches
    if (
      relationship.type !== 'pending_first_second' &&
      relationship.type !== 'pending_second_first'
    ) {
      throw new Error('Invalid relationship type');
    }

    // Delete the relationship from the database

    await prisma.userRelationship.delete({
      where: { id: relationship.id },
    });
  } catch (error) {
    console.error('Error rejecting friend request:', error);
    throw error;
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

export async function retrieveFriendRequests(userId: number) {
  // Find all the pending friend requests for the user
  try {
    const friendRequests = await prisma.userRelationship.findMany({
      where: {
        user_second_id: userId,
        type: 'pending_second_first',
      },
      include: {
        user_first: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profilePictureUrl: true,
            climbingLevel: true,
          },
        },
      },
    });
    return friendRequests;
  } catch (error) {
    console.error('Failed to retrieve friend requests:', error);
    return []; // Return an empty array in case of error
  }
}

export async function retrieveFriendList(userId: number): Promise<User[]> {
  // Retrieve relationships where the user is the first user in the relationship
  const relationshipsAsFirstUser = await prisma.userRelationship.findMany({
    where: {
      user_first_id: userId,
      type: 'friends',
    },
    include: {
      user_second: true,
    },
  });

  // Retrieve relationships where the user is the second user in the relationship
  const relationshipsAsSecondUser = await prisma.userRelationship.findMany({
    where: {
      user_second_id: userId,
      type: 'friends',
    },
    include: {
      user_first: true,
    },
  });

  // Get the friends from the relationships
  const friendsAsFirstUser = relationshipsAsFirstUser.map(
    (relationship) => relationship.user_second,
  );
  const friendsAsSecondUser = relationshipsAsSecondUser.map(
    (relationship) => relationship.user_first,
  );

  // Combine and return the friends lists
  return [...friendsAsFirstUser, ...friendsAsSecondUser];
}

export async function removeFriend(userId: number, friendId: number) {
  // Fetch the relationship
  const relationship = await prisma.userRelationship.findFirst({
    where: {
      OR: [
        {
          user_first_id: userId,
          user_second_id: friendId,
        },
        {
          user_first_id: friendId,
          user_second_id: userId,
        },
      ],
    },
  });

  if (!relationship) {
    // Relationship not found, handle the error
    throw new Error('Friendship not found');
  }

  // Delete the relationship
  await prisma.userRelationship.delete({
    where: { id: relationship.id },
  });
}

export async function checkFriendship(userId: number, friendId: number) {
  // Check if a friendship exists between two users
  try {
    const friendship = await prisma.userRelationship.findFirst({
      where: {
        OR: [
          { user_first_id: userId, user_second_id: friendId },
          { user_first_id: friendId, user_second_id: userId },
        ],
        type: {
          in: ['friends', 'pending_first_second', 'pending_second_first'],
        },
      },
    });

    return Boolean(friendship);
  } catch (error) {
    console.error('Failed to check friendship:', error);
    return false; // Return false in case of error
  }
}
