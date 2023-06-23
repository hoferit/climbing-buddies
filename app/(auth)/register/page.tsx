import { RegistrationForm } from '@/components/RegistrationForm';

export default function RegisterPage() {
  return (
    <main>
      <h1>Register</h1>
      <section className="md:container md:mx-auto">
        <RegistrationForm />
      </section>
    </main>
  );
}
