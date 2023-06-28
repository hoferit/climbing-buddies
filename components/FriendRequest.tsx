import React from 'react';

interface User {
  id: number;
  username: string;
}

interface FriendRequestProps {
  user: User;
  onAccept: (userId: number) => void;
  onReject: (userId: number) => void;
}

export default function FriendRequest({
  user,
  onAccept,
  onReject,
}: FriendRequestProps) {
  const handleAccept = () => {
    onAccept(user.id);
  };

  const handleReject = () => {
    onReject(user.id);
  };

  return (
    <div>
      <h2>Friend Request</h2>
      <p>{user.username} sent you a friend request.</p>
      <button onClick={handleAccept}>Accept</button>
      <button onClick={handleReject}>Reject</button>
    </div>
  );
}
