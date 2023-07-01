'use client';

import { useRouter } from 'next/navigation';
import { logout } from '../../app/(global)/(auth)/logout/actions';

export function LogoutButton() {
  const router = useRouter();
  return (
    <form>
      <button
        className=" text-sm px-4 py-2 leading-none border rounded text-secondary border-secondary-foreground hover:text-primary-foreground hover:bg-secondary mt-4 lg:mt-0"
        formAction={async () => {
          await logout();
          router.refresh();
        }}
      >
        Logout
      </button>
    </form>
  );
}
