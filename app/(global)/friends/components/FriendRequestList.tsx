'use client';
import { UserRelationship } from '@prisma/client';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import { useEffect, useState } from 'react';
import FriendRequestItem from './FriendRequestItem';

export default function FriendRequestList() {
  const [friendRequests, setFriendRequests] = useState<UserRelationship[]>([]);

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
        enqueueSnackbar('Error retrieving friend requests!', {
          variant: 'error',
        });
      }
    }

    fetchFriendRequests().catch((error) => {
      console.error('Error in fetchFriendRequests:', error);
      enqueueSnackbar('Error retrieving friend requests!', {
        variant: 'error',
      });
    });
  }, []);
  const handleAcceptFriendRequest = async (
    userId: number,
    friendId: number,
  ) => {
    try {
      // Make a request to the API to accept the friend request
      const response = await fetch('/api/acceptfriendrequest', {
        method: 'PUT',
        body: JSON.stringify({ userId, friendId }),
      });

      if (response.ok) {
        // If the request is successful, update the friend request list state by filtering out the accepted request
        setFriendRequests((prevRequests) =>
          prevRequests.filter((request) => request.user_first_id !== friendId),
        );
        enqueueSnackbar('Friend request accepted!', { variant: 'success' });
      } else {
        // If the request fails, handle the error appropriately
        console.error('Failed to accept friend request:', response.statusText);
        enqueueSnackbar('Error accepting friend request!', {
          variant: 'error',
        });
      }
    } catch (error) {
      console.error('Error accepting friend request:', error);
      enqueueSnackbar('Error accepting friend request!', { variant: 'error' });
    }
  };

  const handleRejectFriendRequest = async (
    userId: number,
    friendId: number,
  ) => {
    try {
      // Make a request to the API to reject the friend request
      const response = await fetch('/api/rejectfriendrequest', {
        method: 'PUT',
        body: JSON.stringify({ userId, friendId }),
      });

      if (response.ok) {
        // If the request is successful, update the friend request list state by filtering out the rejected request
        setFriendRequests((prevRequests) =>
          prevRequests.filter((request) => request.user_first_id !== friendId),
        );
        enqueueSnackbar('Friend request rejected!', { variant: 'success' });
      } else {
        // If the request fails, handle the error appropriately
        console.error('Failed to reject friend request:', response.statusText);
        enqueueSnackbar('Error rejecting friend request!', {
          variant: 'error',
        });
      }
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      enqueueSnackbar('Error rejecting friend request!', { variant: 'error' });
    }
  };

  return (
    <div>
      <SnackbarProvider>
        <h2>Friend Requests</h2>
        {friendRequests.length > 0 ? (
          <ul>
            {friendRequests.map((request) => (
              <FriendRequestItem
                key={`friend-${request.id}`}
                friendRequest={request as any}
                onAccept={handleAcceptFriendRequest}
                onReject={handleRejectFriendRequest}
              />
            ))}
          </ul>
        ) : (
          <p>No friend requests.</p>
        )}
      </SnackbarProvider>
    </div>
  );
}
