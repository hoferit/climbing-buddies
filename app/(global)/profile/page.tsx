import { cookies } from 'next/headers';
import { getValidSessionByToken } from '../../../database/sessions';
import { EditProfileForm } from './ProfileForm';

export default async function profilePage() {
  const sessionTokenCookie = cookies().get('sessionToken');
  // 2. check if the sessionToken has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));
  return (
    <main>
      {!session ? (
        <section className="bg-primary-background dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1>You need to login first!</h1>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <EditProfileForm />
      )}
    </main>
  );
}
