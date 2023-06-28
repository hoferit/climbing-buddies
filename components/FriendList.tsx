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
    async function retrieveFriendList() {
      try {
        const response = await fetch('/api/retrievefriendlist');
        const data = await response.json();
        setFriends(data.friendList);
      } catch (error) {
        console.error('Error retrieving friend list:', error);
      }
    }

    retrieveFriendList().catch((error) => {
      console.error('Error in retrieveFriendList:', error);
    });
  }, []);

  const handleRemoveFriend = (friendId: number) => {
    // Find the friend to be removed from the list
    const updatedFriends = friends.filter((friend) => friend.id !== friendId);
    setFriends(updatedFriends);
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
