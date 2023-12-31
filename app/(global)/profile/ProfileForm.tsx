'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';
import ImageUpload from '../../../components/ImageUpload';

type ProfileInputs = {
  firstName: string;
  lastName: string;
  climbingLevel: string;
  profilePictureUrl: string;
  dateOfBirth: string;
  bio: string;
};

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  climbingLevel: z.enum(['BEGINNER', 'ADVANCED', 'PRO']),
  dateOfBirth: z.string().nonempty({ message: 'Date of Birth is required.' }),
  profilePictureUrl: z.string(),
  bio: z.string().max(500, 'Bio cannot exceed 500 characters.'),
});

export function EditProfileForm() {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make the API call to fetch user data
        const response = await fetch('/api/getcurrentuserdata');
        const data = await response.json();
        setUserData(data.user);
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };

    fetchUserData().catch((error) => {
      console.error('Error fetching user data:', error);
    });
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileInputs>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (userData?.dateOfBirth) {
      userData.dateOfBirth = new Date(userData.dateOfBirth);
    }

    if (userData) {
      setValue('firstName', userData.firstName || '');
      setValue('lastName', userData.lastName || '');
      setValue('climbingLevel', userData.climbingLevel || '');
      setValue(
        'dateOfBirth',
        (userData.dateOfBirth !== null
          ? userData.dateOfBirth.toISOString().split('T')[0]
          : '') as string,
      );

      setValue('bio', userData.bio || '');
      setValue('profilePictureUrl', userData.profilePictureUrl || '');
    }
  }, [userData, setValue]);

  const onSubmit: SubmitHandler<ProfileInputs> = async (data) => {
    try {
      const response = await fetch('/api/updateuser', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Update was successful
        enqueueSnackbar('Profile updated successfully!', {
          variant: 'success',
        });
      } else {
        // Handle error response
        const errorData = await response.json();
        console.error('Error updating user: ', errorData);
        // Inform user about error
        enqueueSnackbar('Error updating profile!', { variant: 'error' });
      }
    } catch (error) {
      console.error('Failed to update user: ', error);
      // Inform user about error
      enqueueSnackbar('Error updating profile!', { variant: 'error' });
    }
  };

  return (
    <SnackbarProvider>
      <section className="bg-primary-background dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 mx-auto">
          <div className="w-full overflow-hidden bg-white rounded-lg shadow dark:border mt-0 max-w-xl  dark:bg-gray-800 dark:border-gray-700">
            <div className="p-8 space-y-4">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Your Profile
              </h1>
              <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Profile Picture:
              </span>
              <ImageUpload
                onChange={(value) => setValue('profilePictureUrl', value)}
                value={watch('profilePictureUrl') || ''}
              />
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <label
                  htmlFor="firstname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name:
                </label>
                <input
                  id="firstname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  {...register('firstName')}
                />
                {errors.firstName && (
                  <span className="test-red-800 block mt-2">
                    {errors.firstName.message}
                  </span>
                )}
                <label
                  htmlFor="lastname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name:
                </label>
                <input
                  id="lastname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  {...register('lastName')}
                />
                {errors.lastName && (
                  <span className="test-red-800 block mt-2">
                    {errors.lastName.message}
                  </span>
                )}
                <label
                  htmlFor="dateOfBirth"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date of Birth:
                </label>
                <input
                  id="dateOfBirth"
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  {...register('dateOfBirth')}
                />
                {errors.dateOfBirth && (
                  <span className="test-red-800 block mt-2">
                    {errors.dateOfBirth.message}
                  </span>
                )}
                <label
                  htmlFor="bio"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Bio:
                </label>
                <textarea
                  id="bio"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  {...register('bio')}
                />
                {errors.bio && (
                  <span className="test-red-800 block mt-2">
                    {errors.bio.message}
                  </span>
                )}

                <label
                  htmlFor="climbingLevel"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Climbing Level:
                </label>
                <select
                  id="climbingLevel"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  {...register('climbingLevel')}
                >
                  <option value="">Select your level</option>
                  <option value="BEGINNER">Beginner</option>
                  <option value="ADVANCED">Advanced</option>
                  <option value="PRO">Pro</option>
                </select>
                {errors.climbingLevel && (
                  <span className="text-red-800 block mt-2">
                    {errors.climbingLevel.message}
                  </span>
                )}

                <button
                  className="w-full bg-primary text-secondary hover:bg-secondary hover:text-primary border border-input focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  disabled={isSubmitting}
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </SnackbarProvider>
  );
}
