'use client';
import { User } from '@prisma/client';
import { notFound } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { fetchWithAuthCheck } from '../../../../utils/fetchwithauthcheck';
import FriendListItem from './FriendListItem';

export default function FriendList() {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState<User[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function fetchFriendList() {
      try {
        const response = await fetchWithAuthCheck('/api/retrievefriendlist', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          setLoading(false);
          notFound();
        }

        const data = await response.json();
        setFriends(data.friendList);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error && error.message === 'Unauthorized') {
          throw error;
        } else {
          throw error;
        }
      }
    }

    fetchFriendList().catch(() => {}); // dummy catch for ESLint
  }, []);

  const handleRemoveFriend = async (friendId: number) => {
    try {
      const response = await fetchWithAuthCheck('/api/removefriend', {
        method: 'POST',
        body: JSON.stringify({ friendId }),
      });

      if (response.ok) {
        setFriends((prevRequests) =>
          prevRequests.filter((request) => request.id !== friendId),
        );
        enqueueSnackbar('Friend removed!', { variant: 'success' });
      } else {
        const errorData = await response.json();
        enqueueSnackbar(`Error removing friend: ${errorData.message}`, {
          variant: 'error',
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Unauthorized') {
          enqueueSnackbar('You need to log in to view this page.', {
            variant: 'warning',
          });
        } else {
          enqueueSnackbar('Error removing friend!', { variant: 'error' });
          throw error;
        }
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Your Friends</h2>
      {friends.length > 0 ? (
        <ul>
          {friends.map((friend) => (
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
