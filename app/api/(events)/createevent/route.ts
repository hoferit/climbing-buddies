import { NextRequest, NextResponse } from 'next/server';
import { createNewEvent } from '../../../../database/events';
import { authorizeAndAuthenticate } from '../../../../utils/auth';

export async function POST(request: NextRequest): Promise<NextResponse<any>> {
  try {
    // Check authorization and authentication
    const session = await authorizeAndAuthenticate();

    // Retrieve the event details from the request body
    const { title, description, startTime, endTime, styleId, gymId } =
      await request.json();

    // Create the event in the database
    await createNewEvent({
      title,
      description,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      organiserId: session.userId,
      styleId,
      gymId,
    });

    // Return a success response
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const errorMessage = (error as Error).message;

    // Return an error response
    return NextResponse.json({ error: errorMessage }, { status: 401 });
  }
}
