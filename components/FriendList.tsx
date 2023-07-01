'use client';
import { revalidateTag } from 'next/cache';
import React, { useEffect, useState } from 'react';
import FriendListItem from './FriendListItem';

interface Friend {
  id: number;
  username: string;
  profilePictureUrl: string | null;
  climbingLevel: string | null;
  user: User;
}

type User = {
  id: number;
  username: string;
  profilePictureUrl: string | null;
  climbingLevel: string | null;
};

export default function FriendList() {
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    async function fetchFriendList() {
      try {
        const response = await fetch('/api/retrievefriendlist');
        const data = await response.json();
        setFriends(data.friendList);
      } catch (error) {
        console.error('Error retrieving friend list:', error);
      }
    }

    fetchFriendList().catch((error) => {
      console.error('Error in fetchFriendList:', error);
    });
  }, []);

  const handleRemoveFriend = async (friendshipId: number) => {
    try {
      // Make a request to the API to remove the friend
      const response = await fetch(
        `/api/removefriend?friendshipId=${friendshipId}`,
        {
          method: 'DELETE',
        },
      );

      if (response.ok) {
        // If the request is successful, update the friend list state by filtering out the removed friend
        setFriends((prevFriends) =>
          prevFriends.filter((friend) => friend.id !== friendshipId),
        );

        // Trigger revalidation of the friend list cache tag
        revalidateTag('friend-list');
      } else {
        // If the request fails, handle the error appropriately
        console.error('Failed to remove friend:', response.statusText);
      }
    } catch (error) {
      console.error('Error removing friend:', error);
    }
  };

  return (
    <div>
      <h2>Your Friends</h2>
      {friends.length > 0 ? (
        <ul>
          {friends.map((friend) => (
            // Check if friend.user exists before rendering the FriendListItem
            <React.Fragment key={`friend-${friend.id}`}>
              {friend.user && (
                <FriendListItem
                  friend={friend}
                  onRemoveFriend={handleRemoveFriend}
                />
              )}
            </React.Fragment>
          ))}
        </ul>
      ) : (
        <p>No friends yet.</p>
      )}
    </div>
  );
}
