'use client';

import { enqueueSnackbar, SnackbarProvider } from 'notistack';

type AddFriendButtonProps = {
  userId: number;
  friendId: number;
};

export default function AddFriendButton({
  userId,
  friendId,
}: AddFriendButtonProps) {
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
        // Friend added successfully
        enqueueSnackbar('Friend request sent!', { variant: 'success' });
      } else {
        // Failed to add friend
        console.error('Failed to add friend');
        enqueueSnackbar(`Failed to add friend: ${data.error}`, {
          variant: 'error',
        });
      }
    } catch (error) {
      console.error('Error adding friend:', error);
      enqueueSnackbar(`Error adding friend: ${Error}`, {
        variant: 'error',
      });
    }
  };

  return (
    <SnackbarProvider>
      <button
        className="bg-primary text-secondary hover:bg-secondary hover:text-primary border border-input focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        onClick={handleAddFriend}
      >
        Add Friend
      </button>
    </SnackbarProvider>
  );
}
