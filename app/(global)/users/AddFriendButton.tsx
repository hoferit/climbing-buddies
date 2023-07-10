'use client';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import { useEffect, useState } from 'react';

type AddFriendButtonProps = {
  userId: number;
  friendId: number;
};

export default function AddFriendButton({
  userId,
  friendId,
}: AddFriendButtonProps) {
  const [isFriend, setIsFriend] = useState<boolean>(false);

  useEffect(() => {
    async function fetchFriendshipStatus() {
      try {
        const response = await fetch('/api/checkfriendship', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, friendId }),
        });

        if (response.ok) {
          const data = await response.json();
          setIsFriend(data.isFriend);
        }
      } catch (error) {
        console.error('Error checking friendship status:', error);
      }
    }

    fetchFriendshipStatus().catch(() => {}); // dummy catch for ESLint
  }, [userId, friendId]);

  const handleAddFriend = async () => {
    try {
      const response = await fetch('/api/createfriendrequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, friendId }),
      });

      const data = await response.json(); // Parse the response into JSON

      if (response.ok) {
        // Friend request sent successfully
        enqueueSnackbar('Friend request sent!', { variant: 'success' });
        setIsFriend(true); // Update the friendship status
      } else {
        // Failed to send friend request
        console.error('Failed to send friend request');
        enqueueSnackbar(`Failed to send friend request: ${data.error}`, {
          variant: 'error',
        });
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
      enqueueSnackbar(`Error sending friend request: ${error}`, {
        variant: 'error',
      });
    }
  };

  return (
    <SnackbarProvider>
      {!isFriend && (
        <button
          className="bg-primary text-secondary hover:bg-secondary hover:text-primary border border-input focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          onClick={handleAddFriend}
        >
          Add Friend
        </button>
      )}
    </SnackbarProvider>
  );
}
