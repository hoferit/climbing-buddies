import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { getValidSessionByToken } from '../../database/sessions';
import { LogoutButton } from './LogoutButton';

export default async function Header() {
  const sessionTokenCookie = cookies().get('sessionToken');
  // 2. check if the sessionToken has a valid session
  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // 3. Either redirect or render the login form

  return (
    <header>
      <nav className="flex items-center justify-between flex-wrap bg-primary p-6">
        <div className="flex items-center flex-shrink-0 text-secondary mr-6">
          <Link
            className="font-bold text-2xl tracking-tight flex items-center"
            href="/"
          >
            <Image
              src="/cblogo.png"
              alt="climbing buddies logo"
              width={178}
              height={100}
              unoptimized={true}
              priority={true}
            />
            <span className="ml-6">Climbing Buddies</span>
          </Link>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-secondary border-secondary hover:text-secondary-foreground hover:border-secondary-foreground">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link
              className="lock mt-4 lg:inline-block lg:mt-0 text-secondary text-xl hover:text-secondary-foreground mr-4"
              href="/users"
            >
              Users
            </Link>
            <Link
              className="lock mt-4 lg:inline-block lg:mt-0 text-secondary text-xl hover:text-secondary-foreground mr-4"
              href="/friends"
            >
              Friends
            </Link>
            <Link
              className="lock mt-4 lg:inline-block lg:mt-0 text-secondary text-xl hover:text-secondary-foreground mr-4"
              href="/friends"
            >
              Events
            </Link>
            <Link
              className="lock mt-4 lg:inline-block lg:mt-0 text-secondary text-xl hover:text-secondary-foreground mr-4"
              href="/login"
            >
              Gyms
            </Link>
            {!session ? (
              <Link
                className="lock mt-4 lg:inline-block lg:mt-0 text-secondary text-xl hover:text-secondary-foreground mr-4"
                href="/login"
              >
                Login
              </Link>
            ) : null}

            {!session ? (
              <Link
                className="lock mt-4 lg:inline-block lg:mt-0 text-secondary text-xl hover:text-secondary-foreground mr-4"
                href="/register"
              >
                Register
              </Link>
            ) : null}
          </div>
        </div>
        <div>
          <Link
            className="lock mt-4 lg:inline-block lg:mt-0 text-secondary text-xl hover:text-secondary-foreground mr-4"
            href="/profile"
          >
            Profile
          </Link>
        </div>
        <div>
          <LogoutButton />
        </div>
      </nav>
    </header>
  );
}
