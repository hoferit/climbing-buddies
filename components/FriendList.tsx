import React, { useEffect, useState } from 'react';
import FriendListItem from './FriendListItem';

interface User {
  id: number;
  username: string;
  profilePictureUrl: string | null;
  climbingLevel: string | null;
}

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
      console.error('Error in retrieveFriendList:', error);
    });
  }, []);

  const handleRemoveFriend = async (friendshipId: number) => {
    try {
      // Make a request to the API to remove the friend
      const response = await fetch(
        `/api/removefriend?friendId=${friendshipId}`,
        {
          method: 'DELETE',
        },
      );

      if (response.ok) {
        // If the request is successful, update the friend list state by filtering out the removed friend
        setFriends((prevFriends) =>
          prevFriends.filter((friend) => friend.id !== friendshipId),
        );
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
            <FriendListItem
              key={`friend-${friend.id}`}
              friend={friend}
              onRemoveFriend={handleRemoveFriend}
            />
          ))}
        </ul>
      ) : (
        <p>No friends yet.</p>
      )}
    </div>
  );
}
