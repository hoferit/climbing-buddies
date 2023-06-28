import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  username: string;
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

  return (
    <div>
      <h2>Your Friends</h2>
      {friends.length > 0 ? (
        <ul>
          {friends.map((friend) => (
            <li key={`friend-${friend.id}`}>{friend.username}</li>
          ))}
        </ul>
      ) : (
        <p>No friends yet.</p>
      )}
    </div>
  );
}
