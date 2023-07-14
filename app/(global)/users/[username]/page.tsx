import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getUserByUsername } from '../../../../database/users';

type Props = {
  params: { username: string };
};

export const metadata = {
  title: 'User',
  description: 'User Profile Page',
};

export default async function ProfileUsernamePage({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  return (
    <section className="bg-primary-background dark:bg-gray-900 mt-16">
      <div className="flex flex-col items-center justify-center px-6 mx-auto">
        <div className="w-full bg-white rounded-lg shadow dark:border mt-0 max-w-md dark:bg-gray-800 dark:border-gray-700">
          <div className="p-8 space-y-6">
            <h1 className="text-2xl font-bold text-center leading-tight tracking-tight text-gray-900 dark:text-white">
              User Profile
            </h1>
            <Image
              src={user.profilePictureUrl || 'default.jpg'}
              alt="Profile"
              height={200}
              width={200}
              className="object-cover w-32 h-32 rounded-full mx-auto mb-6"
            />
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-medium text-gray-600 dark:text-white">
                  First Name
                </h2>
                <p className="text-gray-900 text-xl">{user.firstName}</p>
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-600 dark:text-white">
                  Last Name
                </h2>
                <p className="text-gray-900 text-xl">{user.lastName}</p>
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-600 dark:text-white">
                  Climbing Level
                </h2>
                <p className="text-gray-900 text-xl">
                  {user.climbingLevel?.toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
