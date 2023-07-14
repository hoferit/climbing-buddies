import { RegistrationForm } from './RegistrationForm';

export const metadata = {
  title: 'Register',
  description: 'Register a user for Climbing Buddies',
};

export default function RegisterPage() {
  return (
    <main>
      <section className="md:container md:mx-auto">
        <RegistrationForm />
      </section>
    </main>
  );
}
