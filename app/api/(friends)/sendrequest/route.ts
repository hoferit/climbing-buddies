import { createFriendRequest } from '@/database/friends';
import { getValidSessionByToken } from '@/database/sessions';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { ErrorResponseBody } from '../user/route';

type SendRequestBody = {
  userId: number;
  friendId: number;
};

const sendRequestSchema = z.object({
  userId: z.number(),
  friendId: z.number(),
});

export type SendRequestResponseBody = {
  friendRequest: {
    id: number;
    userId: number;
    friendId: number;
  };
};

export async function POST(
  request: NextRequest,
): Promise<NextResponse<SendRequestResponseBody | ErrorResponseBody>> {
  // 1. Check if the user is authenticated
  const sessionToken = cookies(request.headers).get('sessionToken')?.value;

  if (!sessionToken) {
    return NextResponse.json(
      {
        error: 'You need to be logged in to send a friend request',
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

  const result = sendRequestSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Invalid data',
      },
      { status: 400 },
    );
  }

  // 3. Create the friend request in the database
  const friendRequest = await createFriendRequest(result.data);

  // 4. Return the friend request
  return NextResponse.json(
    {
      friendRequest,
    },
    {
      status: 200,
    },
  );
}
