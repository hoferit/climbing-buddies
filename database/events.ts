import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface NewEventData {
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  organiserId: number;
  styleId: number;
  gymId: number;
}

export async function createNewEvent(data: NewEventData) {
  try {
    const event = await prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        startTime: data.startTime,
        endTime: data.endTime,
        organiserId: data.organiserId,
        styleId: data.styleId,
        gymId: data.gymId,
      },
    });
    return event;
  } catch (error) {
    throw new Error(`Failed to create event: ${error}`);
  }
}
