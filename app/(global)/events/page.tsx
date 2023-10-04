import { cookies } from 'next/headers';
import Link from 'next/link';
import { getValidSessionByToken } from '../../../database/sessions';
import EventOverview from './components/EventOverview';

export const metadata = {
  title: 'Friends',
  description: 'View and create your Events',
};

export default async function EventsPage() {
  const sessionTokenCookie = cookies().get('sessionToken');
  // 2. check if the sessionToken has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  return (
    <main className="min-h-screen my-6">
      {!session ? (
        <section className="bg-primary-background dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold text-center">
                  You need to login first!
                </h1>
                <div className="text-center">
                  <Link href="/login" className="underline">
                    Click here to Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <EventOverview />
      )}
    </main>
  );
}
