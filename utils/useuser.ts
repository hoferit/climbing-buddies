import { createContext, useContext, useEffect, useState } from 'react';

type User = {
  id: number;
  username: string;
  firstName: string | null;
  lastName: string | null;
  climbingLevel: number | null;
  profilePictureUrl: string | null;
};

type UserContextType = {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
};

export const userContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
  isError: false,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch('/api/user');
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setUser(data.user);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    }
    fetchUser().catch((error) => {
      console.error('An error occurred while fetching the user:', error);
    });
  }, []);

  return { user, isLoading, isError };
}

export function useUser() {
  return useContext(userContext);
}
