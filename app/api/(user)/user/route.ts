import { getUserById } from '@/database/users';
import { authorizeAndAuthenticate } from '@/utils/auth';
import { NextResponse } from 'next/server';

type PublicUser = {
  id: number;
  username: string;
  firstName: string | null;
  lastName: string | null;
  climbingLevel: string | null;
  profilePictureUrl: string | null;
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
  const session = await authorizeAndAuthenticate();

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
      user: {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        climbingLevel: user.climbingLevel,
        profilePictureUrl: user.profilePictureUrl,
      },
    },
    {
      status: 200,
    },
  );
}
