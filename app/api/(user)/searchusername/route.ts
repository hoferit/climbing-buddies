import { getValidSessionByToken } from '@/database/sessions';
import { searchUsersByUsername } from '@/database/users';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

type User = {
  id: number;
  username: string;
  firstName: string | null;
  lastName: string | null;
  climbingLevel: string | null;
  profilePictureUrl: string | null;
};

export type SearchUsersResponseBody = {
  users: User[];
};

export type ErrorResponseBody = {
  error: string;
};

export async function GET(): Promise<
  NextResponse<SearchUsersResponseBody | ErrorResponseBody>
> {
  // 1. Check if the user is authenticated
  const sessionToken = cookies().get('sessionToken')?.value;

  if (!sessionToken) {
    return NextResponse.json(
      {
        error: 'You need to be logged in to update your profile',
      },
      { status: 401 },
    );
  }

  const session = await getValidSessionByToken(sessionToken);

  if (!session) {
    return NextResponse.json(
      {
        error: 'Session not found',
      },
      { status: 404 },
    );
  }
  // Perform the search query to retrieve matching users
  const searchTerm = 'example'; // Replace with the actual search term
  const users = await searchUsersByUsername(searchTerm);

  // Return the search results
  return NextResponse.json(
    {
      users: users.map((user) => ({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        climbingLevel: user.climbingLevel,
        profilePictureUrl: user.profilePictureUrl,
      })),
    },
    { status: 200 },
  );
}
