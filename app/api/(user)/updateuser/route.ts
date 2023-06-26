import { getValidSessionByToken } from '@/database/sessions';
import { updateUserById } from '@/database/users';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { ErrorResponseBody } from '../user/route';

type UpdateUserBody = {
  firstName: string | null;
  lastName: string | null;
  climbingLevel: number | null;
  profilePictureUrl: string | null;
};

const updateUserSchema = z.object({
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  climbingLevel: z.number().nullable(),
  profilePictureUrl: z.string().nullable(),
});

export type UpdateUserResponseBody = {
  user: UpdateUserBody;
};

export async function PATCH(
  request: NextRequest,
): Promise<NextResponse<UpdateUserResponseBody | ErrorResponseBody>> {
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

  // 2. Validate and parse the request body
  const body = await request.json();

  const result = updateUserSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Invalid data',
      },
      { status: 400 },
    );
  }

  // 3. Update the user in the database
  const updatedUser = await updateUserById(session.userId, result.data);

  if (!updatedUser) {
    return NextResponse.json(
      {
        error: 'User not found',
      },
      { status: 404 },
    );
  }

  // 4. Return the updated user
  return NextResponse.json(
    {
      user: {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        climbingLevel: updatedUser.climbingLevel,
        profilePictureUrl: updatedUser.profilePictureUrl,
      },
    },
    {
      status: 200,
    },
  );
}
