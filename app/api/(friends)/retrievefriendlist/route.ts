import { NextResponse } from 'next/server';
import { retrieveFriendList } from '../../../../database/friends';
import { authorizeAndAuthenticate } from '../../../../utils/auth';

export async function GET(): Promise<NextResponse<any>> {
  try {
    // 1. Check authorization and authentication
    const session = await authorizeAndAuthenticate();

    // 2. Retrieve the friend list for the user
    const friendList = await retrieveFriendList(session.userId);

    // 3. Return the friend list
    return NextResponse.json({ friendList: friendList }, { status: 200 });
  } catch (error) {
    const errorMessage = (error as Error).message;

    return NextResponse.json({ error: errorMessage }, { status: 401 });
  }
}
