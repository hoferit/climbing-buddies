import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getValidSessionByToken } from '../../../../database/sessions';
import { updateUserById } from '../../../../database/users';
import { ErrorResponseBody } from '../getusers/route';

type UpdateUserBody = {
  firstName: string | null;
  lastName: string | null;
  climbingLevel: string | null;
  dateOfBirth: string | null;
  profilePictureUrl: string | null;
  bio: string | null;
};

const updateUserSchema = z.object({
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  climbingLevel: z.enum(['BEGINNER', 'ADVANCED', 'PRO']).nullable(),
  dateOfBirth: z.string().nonempty({ message: 'Date of Birth is required.' }),
  profilePictureUrl: z.string(),
  bio: z.string().max(500, 'Bio cannot exceed 500 characters.'),
});

export type UpdateUserResponseBody = {
  user: UpdateUserBody;
};

export async function PUT(
  request: NextRequest,
): Promise<NextResponse<UpdateUserResponseBody | ErrorResponseBody>> {
  // 1. Check if the user is authenticated
  const sessionTokenCookie = cookies().get('sessionToken');

  if (!sessionTokenCookie) {
    return NextResponse.json(
      {
        error: 'You need to be logged in to update your profile',
      },
      { status: 401 },
    );
  }

  const session = await getValidSessionByToken(sessionTokenCookie.value);

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
  const updatedData = {
    ...result.data,
    dateOfBirth: result.data.dateOfBirth
      ? new Date(result.data.dateOfBirth)
      : null,
  };

  const updatedUser = await updateUserById(session.userId, updatedData);

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
        dateOfBirth: updatedUser.dateOfBirth
          ? updatedUser.dateOfBirth.toISOString()
          : null,
        bio: updatedUser.bio,
      },
    },
    {
      status: 200,
    },
  );
}
