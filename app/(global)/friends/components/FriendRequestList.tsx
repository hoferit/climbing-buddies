'use client';
import { UserRelationship } from '@prisma/client';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { fetchWithAuthCheck } from '../../../../utils/fetchwithauthcheck';
import FriendRequestItem from './FriendRequestItem';

export default function FriendRequestList() {
  const [loading, setLoading] = useState(true);
  const [friendRequests, setFriendRequests] = useState<UserRelationship[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function fetchFriendRequests() {
      try {
        const response = await fetchWithAuthCheck(
          '/api/retrievefriendrequests',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const data = await response.json();
        setFriendRequests(data.friendRequests);
      } catch (error) {
        // If error happens gets directed to error.js
      } finally {
        setLoading(false);
      }
    }

    fetchFriendRequests().catch(() => {}); // dummy catch for ESLint
  }, []);

  const handleAcceptFriendRequest = async (
    userId: number,
    friendId: number,
  ) => {
    try {
      const response = await fetchWithAuthCheck('/api/acceptfriendrequest', {
        method: 'PUT',
        body: JSON.stringify({ userId, friendId }),
      });

      if (response.ok) {
        setFriendRequests((prevRequests) =>
          prevRequests.filter((request) => request.user_first_id !== friendId),
        );
        enqueueSnackbar('Friend request accepted!', { variant: 'success' });
      } else {
        const errorData = await response.json();
        enqueueSnackbar(
          `Error accepting friend request: ${errorData.message}`,
          { variant: 'error' },
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Unauthorized') {
          enqueueSnackbar('You need to log in to view this page.', {
            variant: 'warning',
          });
        } else {
          enqueueSnackbar('Error accepting friend request!', {
            variant: 'error',
          });
          throw error;
        }
      }
    }
  };

  const handleRejectFriendRequest = async (
    userId: number,
    friendId: number,
  ) => {
    try {
      const response = await fetchWithAuthCheck('/api/rejectfriendrequest', {
        method: 'PUT',
        body: JSON.stringify({ userId, friendId }),
      });

      if (response.ok) {
        // If request is successful, update state by filtering out the rejected request
        setFriendRequests((prevRequests) =>
          prevRequests.filter((request) => request.user_first_id !== friendId),
        );
        enqueueSnackbar('Friend request rejected!', { variant: 'success' });
      } else {
        // If the request fails, handle error
        const errorData = await response.json();
        enqueueSnackbar(
          `Error rejecting friend request: ${errorData.message}`,
          {
            variant: 'error',
          },
        );
      }
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      enqueueSnackbar('Error rejecting friend request!', { variant: 'error' });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
    </div>
  );
}
