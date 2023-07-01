'use client';
import React, { useEffect, useState } from 'react';
import FriendRequestItem from './FriendRequestItem';

interface Friend {
  id: number;
  username: string;
  profilePictureUrl: string | null;
  climbingLevel: string | null;
}

export default function FriendRequestList() {
  const [friendRequests, setFriendRequests] = useState<Friend[]>([]);

  useEffect(() => {
    async function fetchFriendRequests() {
      try {
        const response = await fetch('/api/retrievefriendrequests', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setFriendRequests(data.friendRequests);
      } catch (error) {
        console.error('Error retrieving friend requests:', error);
      }
    }

    fetchFriendRequests().catch((error) => {
      console.error('Error in fetchFriendRequests:', error);
    });
  }, []);

  const handleAcceptFriendRequest = async (friendshipId: number) => {
    try {
      // Make a request to the API to accept the friend request
      const response = await fetch('/api/acceptrequest', {
        method: 'PUT',
        body: JSON.stringify({ friendshipId }),
      });

      if (response.ok) {
        // If the request is successful, update the friend request list state by filtering out the accepted request
        setFriendRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== friendshipId),
        );
      } else {
        // If the request fails, handle the error appropriately
        console.error('Failed to accept friend request:', response.statusText);
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleRejectFriendRequest = async (friendshipId: number) => {
    try {
      // Make a request to the API to reject the friend request
      const response = await fetch('/api/rejectrequest', {
        method: 'PUT',
        body: JSON.stringify({ friendshipId }),
      });

      if (response.ok) {
        // If the request is successful, update the friend request list state by filtering out the rejected request
        setFriendRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== friendshipId),
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
      <h2>Friend Requests</h2>
      {friendRequests.length > 0 ? (
        <ul>
          {friendRequests.map((request) => (
            <FriendRequestItem
              key={`friend-${request.id}`}
              friendRequest={request}
              onAccept={handleAcceptFriendRequest}
              onReject={handleRejectFriendRequest}
            />
          ))}
        </ul>
      ) : (
        <p>No friend requests.</p>
      )}
    </div>
  );
}
