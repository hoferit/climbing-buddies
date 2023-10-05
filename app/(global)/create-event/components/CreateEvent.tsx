import * as z from 'zod';

const createEventSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().min(1, 'Description is required'),
  organiserId: z
    .number()
    .int()
    .positive('Organizer ID should be a positive integer'),
  styleId: z.number().int().positive('Style ID should be a positive integer'),
  startTime: z.string().min(1, 'Start time is required'), // TODO: implement date-fns library
  endTime: z.string().min(1, 'End time is required'),
  gymId: z.number().int().positive('Gym ID should be a positive integer'),
  status: z.enum(['UPCOMING', 'PAST', 'CANCELLED']), // TODO: create EventStatus enum in Prisma Schema
});

export default function CreateEvent() {
  return (
    <div>
      <h1>Create Event</h1>
    </div>
  );
}
