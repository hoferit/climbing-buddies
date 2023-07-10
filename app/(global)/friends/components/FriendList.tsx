'use client';
import { User } from '@prisma/client';
import { notFound } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { fetchWithAuthCheck } from '../../../../utils/fetchwithauthcheck';
import FriendListItem from './FriendListItem';

interface FriendListProps {
  triggerFetch: boolean;
  setTriggerFetch: Dispatch<SetStateAction<boolean>>;
}

export default function FriendList({
  triggerFetch,
  setTriggerFetch,
}: FriendListProps) {
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
    setTriggerFetch(false);
  }, [setTriggerFetch, triggerFetch]);

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
    <section className="bg-primary-background dark:bg-gray-900 my-6">
      <div className="flex flex-col items-center justify-center px-6 mx-auto">
        <div className="w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h2 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Your Friends
            </h2>
            {friends.length > 0 ? (
              <table className="w-full table-auto">
                <tbody className="divide-y divide-gray-200">
                  {friends.map((friend, index) => (
                    <tr
                      key={`user-tr-${friend.id}`}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-grey-50'}
                    >
                      <FriendListItem
                        key={`friend-${friend.id}`}
                        friend={friend}
                        onRemoveFriend={handleRemoveFriend}
                      />
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center">No friends yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
