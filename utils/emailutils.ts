import { EmailTemplate } from '@/components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(
  email: string,
  username: string,
): Promise<void> {
  try {
    await resend.emails.send({
      from: 'Climbing Buddies <welcome@hoferit.com>',
      to: [email],
      subject: 'Welcome to Climbing Buddies',
      react: EmailTemplate({ username }),
    });
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
}
