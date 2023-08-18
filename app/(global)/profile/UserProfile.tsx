'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { PublicUser } from '../../api/(user)/getusers/route';

export default function UserProfile() {
  const [user, setUser] = useState<PublicUser>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make the API call to fetch user data
        setLoading(true);

        const response = await fetch('/api/getcurrentuserdata');
        const userData = await response.json();
        setUser(userData.user);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user data', error);
        setLoading(false);
      }
    };

    fetchUserData().catch((error) => {
      console.error('Error fetching user data:', error);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-primary-background dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 mx-auto">
        <div className="w-full bg-white rounded-lg shadow dark:border mt-0 max-w-md  dark:bg-gray-800 dark:border-gray-700">
          <div className="p-8 space-y-4">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Your Profile
            </h1>
            <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Profile Picture:
            </span>
            {user?.profilePictureUrl ? (
              <Image
                className="w-full h-full"
                src={user.profilePictureUrl}
                alt={`Profile Picture of ${user.username}`}
                width={400}
                height={400}
              />
            ) : (
              <p>No profile picture available</p>
            )}

            <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              First Name:
            </p>
            <p className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5">
              {user?.firstName}
            </p>

            <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Last Name:
            </p>
            <p className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5">
              {user?.lastName}
            </p>

            <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Bio:
            </p>
            <p className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5">
              {user?.bio}
            </p>

            <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Climbing Level:
            </p>
            <p className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5">
              {user?.climbingLevel?.toLowerCase()}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
