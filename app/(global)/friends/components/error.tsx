'use client';

import Link from 'next/link';

type ErrorProps = {
  error: Error;
};

export default function Error({ error }: ErrorProps) {
  return (
    <div className="grid h-screen px-4 bg-white place-content-center">
      <div className="text-center">
        <h1 className="font-black text-gray-200 text-9xl">401</h1>

        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Something went wrong!
        </p>

        <p className="mt-4 text-gray-500">
          {error.message || 'You must be logged in to access the page'}
        </p>

        <Link
          href="/login"
          className="inline-block bg-primary text-secondary hover:bg-secondary hover:text-primary border border-input focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
