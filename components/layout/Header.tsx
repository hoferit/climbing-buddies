import Link from 'next/link';
import { LogoutButton } from './LogoutButton';

export default function Header() {
  return (
    <header>
      <nav className="flex items-center justify-between flex-wrap bg-primary p-6">
        <div className="flex items-center flex-shrink-0 text-secondary mr-6">
          <Link className="font-semibold text-xl tracking-tight" href="/">
            Climbing Buddies
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
              className="lock mt-4 lg:inline-block lg:mt-0 text-secondary hover:text-secondary-foreground mr-4"
              href="/login"
            >
              Friends
            </Link>
            <Link
              className="lock mt-4 lg:inline-block lg:mt-0 text-secondary hover:text-secondary-foreground mr-4"
              href="/login"
            >
              Events
            </Link>
            <Link
              className="lock mt-4 lg:inline-block lg:mt-0 text-secondary hover:text-secondary-foreground mr-4"
              href="/login"
            >
              Login
            </Link>
            <Link
              className="lock mt-4 lg:inline-block lg:mt-0 text-secondary hover:text-secondary-foreground mr-4"
              href="/register"
            >
              Register
            </Link>
          </div>
        </div>
        <div>
          <LogoutButton />
        </div>
      </nav>
    </header>
  );
}
