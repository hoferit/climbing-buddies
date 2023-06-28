import { getFriendList } from '@/database/friends';
import { authorizeAndAuthenticate } from '@/utils/auth';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse<any>> {
  try {
    // 1. Check authorization and authentication
    const session = await authorizeAndAuthenticate();
    console.log('Session:', session);

    // 2. Retrieve the friend list for the user
    const friendList = await getFriendList(session.userId);
    console.log('Friend List:', friendList);

    // 3. Return the friend list
    return NextResponse.json({ friendList }, { status: 200 });
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error('Error:', errorMessage);

    return NextResponse.json({ error: errorMessage }, { status: 401 });
  }
}
