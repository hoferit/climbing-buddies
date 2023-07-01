import { User } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

interface FriendRequest {
  id: number;
  type: string;
  createdAt: string;
  user_first_id: number;
  user_second_id: number;
  user_first: User;
}

interface FriendRequestItemProps {
  friendRequest: FriendRequest;
  onAccept: (friendshipId: number) => void;
  onReject: (friendshipId: number) => void;
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
      <div>
        {!!friendRequest.user_first.profilePictureUrl && (
          <Image
            src={friendRequest.user_first.profilePictureUrl}
            alt="Profile Picture"
            width={100}
            height={100}
          />
        )}
        <p>username: {friendRequest.user_first.username}</p>
        <p>climbing level: {friendRequest.user_first.climbingLevel}</p>
      </div>
      <div>
        <button onClick={handleAccept}>Accept</button>
        <button onClick={handleReject}>Reject</button>
      </div>
    </li>
  );
}
