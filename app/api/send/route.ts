import { EmailTemplate } from '@/components/EmailTemplate';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// eslint-disable-next-line no-restricted-syntax
export async function POST() {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@mhoferit.com',
      to: 'morehofer@gmail.com',
      subject: 'Hello world',
      react: EmailTemplate({ firstName: 'Michi' }),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
