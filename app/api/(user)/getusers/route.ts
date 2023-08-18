import { NextResponse } from 'next/server';
import { getAllUsers } from '../../../../database/users';
import { authorizeAndAuthenticate } from '../../../../utils/auth';

export type PublicUser = {
  id: number;
  username: string;
  firstName: string | null;
  lastName: string | null;
  climbingLevel: string | null;
  profilePictureUrl: string | null;
  bio: string | null;
};

export type UsersResponseBodyGet = {
  users: PublicUser[];
};

export type ErrorResponseBody = {
  error: string;
};

export async function GET(): Promise<
  NextResponse<UsersResponseBodyGet | ErrorResponseBody>
> {
  try {
    // 1. Check authorization and authentication
    await authorizeAndAuthenticate();

    // 2. Retrieve all users
    const users = await getAllUsers();

    if (!users) {
      throw new Error('Could not fetch users');
    }

    // 3. Return the users
    return NextResponse.json(
      {
        users,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    const errorMessage = (error as Error).message;

    return NextResponse.json({ error: errorMessage }, { status: 401 });
  }
}
