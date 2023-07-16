import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex items-center justify-between flex-wrap bg-primary p-6 z-20 sticky top-[100vh] w-full">
      <div className="flex items-center flex-shrink-0 text-secondary mr-6">
        <p className="font-semibold text-sm tracking-tight">
          © {new Date().getFullYear()} Climbing Buddies. All rights reserved.
        </p>
      </div>
      <div className="text-sm">
        <Link
          className="lock text-secondary hover:text-secondary-foreground mr-4"
          href="/#"
        >
          About
        </Link>
        <Link
          className="lock text-secondary hover:text-secondary-foreground mr-4"
          href="/#"
        >
          Contact Us
        </Link>
        <Link
          className="lock text-secondary hover:text-secondary-foreground mr-4"
          href="/#"
        >
          Privacy Policy
        </Link>
        <Link
          className="lock text-secondary hover:text-secondary-foreground mr-4"
          href="/#"
        >
          Terms of Service
        </Link>
      </div>
    </footer>
  );
}
