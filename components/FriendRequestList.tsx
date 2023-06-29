import React from 'react';
import FriendRequestItem from './FriendRequestItem';

interface User {
  id: number;
  username: string;
  profilePictureUrl: string | null;
  climbingLevel: string | null;
}

interface FriendRequestListProps {
  friendRequests: User[];
  onAccept: (friendshipId: number) => void;
  onReject: (friendshipId: number) => void;
}

export default function FriendRequestList({
  friendRequests,
  onAccept,
  onReject,
}: FriendRequestListProps) {
  return (
    <div>
      <h2>Friend Requests:</h2>
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
