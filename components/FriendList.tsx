import React from 'react';

interface User {
  id: number;
  username: string;
}

interface FriendListProps {
  friends: User[];
}

export default function FriendList({ friends }: FriendListProps) {
  return (
    <div>
      <h2>Friend List</h2>
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
