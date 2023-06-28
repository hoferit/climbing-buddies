import React from 'react';

interface User {
  id: number;
  username: string;
}

interface FriendRequestItemProps {
  friendRequest: User;
  onAccept: (friendId: number) => void;
  onReject: (friendId: number) => void;
}

export default function FriendRequestItem({
  friendRequest,
  onAccept,
  onReject,
}: FriendRequestItemProps) {
  const handleAccept = () => {
    onAccept(friendRequest.id);
  };

  const handleReject = () => {
    onReject(friendRequest.id);
  };

  return (
    <li key={`friend-request-${friendRequest.id}`}>
      {friendRequest.username}
      <button onClick={handleAccept}>Accept</button>
      <button onClick={handleReject}>Reject</button>
    </li>
  );
}
