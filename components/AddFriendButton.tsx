'use client';
type AddFriendButtonProps = {
  friendId: number;
};

export default function AddFriendButton({ friendId }: AddFriendButtonProps) {
  const handleAddFriend = async () => {
    try {
      const response = await fetch('/api/addfriendbyid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friendId }),
      });

      if (response.ok) {
        // Friend added successfully
        console.log('Friend added!');
      } else {
        // Failed to add friend
        console.error('Failed to add friend');
      }
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  return <button onClick={handleAddFriend}>Add Friend</button>;
}
