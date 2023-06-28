import React from 'react';
import FriendRequestItem from './FriendRequestItem';

interface User {
  id: number;
  username: string;
}

interface FriendRequestListProps {
  friendRequests: User[];
  onAccept: (friendId: number) => void;
  onReject: (friendId: number) => void;
}

export default function FriendRequestList({
  friendRequests,
  onAccept,
  onReject,
}: FriendRequestListProps) {
  return (
    <div>
      <h2>Friend Requests</h2>
      {friendRequests.length > 0 ? (
        <ul>
          {friendRequests.map((friendRequest) => (
            <FriendRequestItem
              key={`friend-request-${friendRequest.id}`}
              friendRequest={friendRequest}
              onAccept={onAccept}
              onReject={onReject}
            />
          ))}
        </ul>
      ) : (
        <p>No friend requests.</p>
      )}
    </div>
  );
}
