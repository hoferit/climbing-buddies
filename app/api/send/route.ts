import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { EmailTemplate } from '../../../components/EmailTemplate';

interface EmailSendResponse {
  id?: string;
  error?: unknown;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(): Promise<NextResponse<EmailSendResponse>> {
  try {
    const data = await resend.emails.send({
      from: 'Climbing Buddies <onboarding@hoferit.com>',
      to: ['mhofer@gmail.com'],
      subject: 'Welcome to Climbing Buddies',
      react: EmailTemplate({ username: 'michi' }) as any,
    });

    return NextResponse.json<EmailSendResponse>({ id: data.id });
  } catch (error) {
    return NextResponse.json<EmailSendResponse>({ error });
  }
}
