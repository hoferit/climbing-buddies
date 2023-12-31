import crypto from 'node:crypto';
// import { sendWelcomeEmail } from '@/utils/emailutils';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createSession } from '../../../../database/sessions';
import { createUser, getUserByUsername } from '../../../../database/users';
import { secureCookieOptions } from '../../../../utils/cookies';

export type RegisterResponseBodyPost = {
  user: User;
};

// Type for GraphQL response body
export type GraphQlResponseBody =
  | { user: { username: string; id: number } }
  | {
      username: string;
      password: string;
      email: string;
    }
  | {
      error: string;
    }
  | {
      status: number;
    };

const userSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  email: z.string().min(1),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<GraphQlResponseBody>> {
  const body = await request.json();

  // 1. get the credentials from the body
  const result = userSchema.safeParse(body);

  // 2. verify the user data and check that the name is not taken
  if (!result.success) {
    return NextResponse.json(
      {
        error: 'username or password or email missing',
      },
      { status: 400 },
    );
  }

  if (await getUserByUsername(result.data.username)) {
    return NextResponse.json(
      {
        error: 'username is already used',
      },
      { status: 406 },
    );
  }

  if (await getUserByUsername(result.data.email)) {
    return NextResponse.json(
      {
        error: 'email is already used',
      },
      { status: 406 },
    );
  }

  // 3. hash the password
  const passwordHash = await bcrypt.hash(result.data.password, 10);

  // 4. store the credentials in the db
  const newUser = await createUser(
    result.data.username,
    passwordHash,
    result.data.email,
  );

  if (!newUser) {
    return NextResponse.json(
      {
        error: 'Error creating the new user',
      },
      { status: 500 },
    );
  }

  // We are sure the user is authenticated

  // 5. Create a token
  const token = crypto.randomBytes(100).toString('base64');
  // 6. Create the session record

  const session = await createSession(token, newUser.id);

  if (!session) {
    return NextResponse.json(
      {
        error: 'Error creating the new session',
      },
      { status: 500 },
    );
  }

  // 7. Send the new cookie in the headers
  cookies().set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });
  // await sendWelcomeEmail(newUser.email, newUser.username);

  // 7. return the new user to the client
  const handler = NextResponse.json({ user: newUser });

  return handler as NextResponse<GraphQlResponseBody>;
}
