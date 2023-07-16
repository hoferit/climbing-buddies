import { RegistrationForm } from './RegistrationForm';

export const metadata = {
  title: 'Register',
  description: 'Register a user for Climbing Buddies',
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen my-6">
      <section className="md:container md:mx-auto">
        <RegistrationForm />
      </section>
    </main>
  );
}
