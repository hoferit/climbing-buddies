import { userContext } from '@/utils/useuser'; // Import your UserContext
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as z from 'zod';

type ProfileInputs = {
  firstName: string;
  lastName: string;
  climbingLevel: number;
};

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  climbingLevel: z.number(),
});

export function EditProfileForm() {
  const { user } = useContext(userContext); // Use your UserContext

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileInputs>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (user) {
      setValue('firstName', user.firstName || '');
      setValue('lastName', user.lastName || '');
      setValue('climbingLevel', user.climbingLevel || 0);
    }
  }, [setValue, user]);

  const onSubmit: SubmitHandler<ProfileInputs> = async (data) => {
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Update was successful
        const updatedUser = await response.json();
        console.log('Updated user: ', updatedUser);
        // You can also use a notification or alert library to inform user about successful operation
        // for example if you use notistack: enqueueSnackbar('Profile updated successfully!', { variant: 'success' });
      } else {
        // Handle error response
        const errorData = await response.json();
        console.error('Error updating user: ', errorData);
        // Inform user about error
        // enqueueSnackbar('Error updating profile!', { variant: 'error' });
      }
    } catch (error) {
      console.error('Failed to update user: ', error);
      // Inform user about error
      // enqueueSnackbar('Error updating profile!', { variant: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        First Name:
        <input {...register('firstName')} />
        {errors.firstName && <p>{errors.firstName.message}</p>}
      </label>
      <label>
        Last Name:
        <input {...register('lastName')} />
        {errors.lastName && <p>{errors.lastName.message}</p>}
      </label>
      <label>
        Climbing Level:
        <input type="number" {...register('climbingLevel')} />
        {errors.climbingLevel && <p>{errors.climbingLevel.message}</p>}
      </label>
      <input type="submit" />
    </form>
  );
}
