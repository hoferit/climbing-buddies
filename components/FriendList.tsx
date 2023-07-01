'use client';
import { User, UserRelationship } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import FriendListItem from './FriendListItem';

export default function FriendList() {
  const [friends, setFriends] = useState<User[]>([]);

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

  const handleRemoveFriend = async (friendId: number) => {
    try {
      // Send a POST request to the API route with the friend ID in the request body
      const response = await fetch('/api/removefriend', {
        method: 'POST',
        body: JSON.stringify({ friendId }),
      });

      // Check if the response was successful
      if (response.ok) {
        // If the request is successful, update the friend request list state by filtering out the rejected request
        setFriends((prevRequests) =>
          prevRequests.filter((request) => request.id !== friendId),
        );
      } else {
        // If the request fails, handle the error appropriately
        console.error('Failed to reject friend request:', response.statusText);
      }
    } catch (error) {
      console.error('Error rejecting friend request:', error);
    }
  };

  return (
    <div>
      <h2>Your Friends</h2>
      {friends.length > 0 ? (
        <ul>
          {friends.map((friend) => (
            // Check if friend.user exists before rendering the FriendListItem
            <div key={`friend-${friend.id}`}>
              <FriendListItem
                friend={friend}
                onRemoveFriend={handleRemoveFriend}
              />
            </div>
          ))}
        </ul>
      ) : (
        <p>No friends yet.</p>
      )}
    </div>
  );
}
