import { NextResponse } from 'next/server';
import { authorizeAndAuthenticate } from '../../../../utils/auth';

export type UserResponseBodyGet = {
  userId: number;
};

export type ErrorResponseBody = {
  error: string;
};

export async function GET(): Promise<
  NextResponse<UserResponseBodyGet | ErrorResponseBody>
> {
  try {
    // 1. Check authorization and authentication
    const session = await authorizeAndAuthenticate();

    // 2. Return user ID
    return NextResponse.json(
      {
        userId: session.userId,
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
