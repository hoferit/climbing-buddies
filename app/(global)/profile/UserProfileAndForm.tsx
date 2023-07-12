'use client';
import { useState } from 'react';
import { EditProfileForm } from './ProfileForm';
import UserProfile from './UserProfile';

export default function UserProfileAndForm() {
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  return (
    <section className="bg-primary-background dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 mx-auto">
        <div className="w-full bg-white rounded-lg shadow dark:border mt-0 max-w-md  dark:bg-gray-800 dark:border-gray-700">
          <div className="p-8 space-y-4">
            {!showForm ? <UserProfile /> : <EditProfileForm />}
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleButtonClick}
              className="bg-primary text-secondary hover:bg-secondary hover:text-primary border border-input focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mb-6 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              {showForm ? 'Show' : 'Edit'} Profile
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
