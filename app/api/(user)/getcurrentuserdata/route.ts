import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getValidSessionByToken } from '../../../../database/sessions';
import { getUserById } from '../../../../database/users';

type PublicUser = {
  id: number;
  username: string;
  firstName: string | null;
  lastName: string | null;
  climbingLevel: string | null;
  dateOfBirth: Date | null;
  profilePictureUrl: string | null;
  bio: string | null;
};

export type UserResponseBodyGet = {
  user: PublicUser;
};

export type ErrorResponseBody = {
  error: string;
};

export async function GET(): Promise<
  NextResponse<UserResponseBodyGet | ErrorResponseBody>
> {
  // Get the session token from the cookies
  const validSessionToken = cookies().get('sessionToken')?.value;

  if (!validSessionToken) {
    return NextResponse.json(
      {
        error: 'Session token is missing',
      },
      { status: 401 },
    );
  }

  // Get the session from the database
  const session = await getValidSessionByToken(validSessionToken);

  if (!session) {
    return NextResponse.json(
      {
        error: 'Invalid session token',
      },
      { status: 401 },
    );
  }

  // Get the user from the database
  const user = await getUserById(session.userId);

  if (!user) {
    return NextResponse.json(
      {
        error: 'User not found',
      },
      { status: 404 },
    );
  }

  // Return the user data
  return NextResponse.json(
    {
      user,
    },
    {
      status: 200,
    },
  );
}
