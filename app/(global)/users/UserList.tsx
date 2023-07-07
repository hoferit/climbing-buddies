'use client';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PublicUser } from '../../api/(user)/getusers/route';
import AddFriendButton from './AddFriendButton';

export default function UserList() {
  const [users, setUsers] = useState<PublicUser[]>([]);
  const [currentUser, setCurrentUser] = useState<number | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsersAndCurrentUser() {
      try {
        // fetch the current logged in user's data
        console.log('Fetching current user...');
        const currentUserResponse = await fetch('/api/getcurrentuser', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (currentUserResponse.ok) {
          const currentUserData = await currentUserResponse.json();
          setCurrentUser(currentUserData.userId);
        } else {
          throw new Error('Failed to fetch current user');
        }

        // fetch all users
        console.log('Fetching all users...');
        const allUsersResponse = await fetch('/api/getusers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (allUsersResponse.ok) {
          const allUsersData = await allUsersResponse.json();
          setUsers(allUsersData.users);
          console.log('All users fetched:', allUsersData.users);
        } else {
          throw new Error('Failed to fetch all users');
        }

        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
          console.error('An error occurred:', err.message);
        } else {
          setError(new Error('An unexpected error occurred.'));
        }
      }
    }

    fetchUsersAndCurrentUser().catch((err) =>
      setError(
        err instanceof Error ? err : new Error('An unexpected error occurred.'),
      ),
    );
  }, []);
  if (error) {
    notFound(); // <- throw the error so the error boundary can catch it
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-primary-background dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              User List
            </h1>
            {users.map((user) => (
              <div
                className="space-y-2 md:space-y-4"
                key={`user-div-${user.id}`}
              >
                <Link href={`/users/${user.username}`}>{user.username}</Link>
                {user.profilePictureUrl ? (
                  <Image
                    alt="uploaded"
                    src={user.profilePictureUrl}
                    unoptimized={true}
                    width={250}
                    height={250}
                  />
                ) : (
                  <p>No profile picture available</p>
                )}
                <div>First Name: {user.firstName}</div>
                <div>Last Name: {user.lastName}</div>
                <div>Climbing Level: {user.climbingLevel}</div>
                {user.id !== currentUser && (
                  <AddFriendButton
                    userId={currentUser ?? 0}
                    friendId={user.id}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
