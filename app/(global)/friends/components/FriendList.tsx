'use client';
import { User } from '@prisma/client';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import FriendListItem from './FriendListItem';

export default function FriendList() {
  const [friends, setFriends] = useState<User[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function fetchFriendList() {
      try {
        const response = await fetch('/api/retrievefriendlist');
        const data = await response.json();
        setFriends(data.friendList);
      } catch (error) {
        enqueueSnackbar(`An error occurred: ${error}`, { variant: 'error' });
        throw error;
      }
    }

    fetchFriendList().catch((error) => {
      enqueueSnackbar(`An error occurred: ${error}`, { variant: 'error' });
    });
  }, [enqueueSnackbar]);
  // If an error occurred, throw it here so the error boundary can catch it

  const handleRemoveFriend = async (friendId: number) => {
    try {
      // Send a POST request to the API route with the friend ID in the request body
      const response = await fetch('/api/removefriend', {
        method: 'POST',
        body: JSON.stringify({ friendId }),
      });

      // Check if the response was successful
      if (response.ok) {
        // If the request is successful, update the friend request list state by filtering out the rejected request
        setFriends((prevRequests) =>
          prevRequests.filter((request) => request.id !== friendId),
        );
      } else {
        // If the request fails, handle the error appropriately
        console.error('Failed to reject friend request:', response.statusText);
      }
    } catch (error) {
      enqueueSnackbar(`An error occurred: ${Error}`, { variant: 'error' });
      throw error;
    }
  };

  return (
    <div>
      <h2>Your Friends</h2>
      {friends.length > 0 ? (
        <ul>
          {friends.map((friend) => (
            // Check if friend.user exists before rendering the FriendListItem
            <div key={`friend-${friend.id}`}>
              <FriendListItem
                friend={friend}
                onRemoveFriend={handleRemoveFriend}
              />
            </div>
          ))}
        </ul>
      ) : (
        <p>No friends yet.</p>
      )}
    </div>
  );
}
