import { EditProfileForm } from '@/components/ProfileForm';
import { UserProvider } from '@/utils/useuser';

export default function profilePage() {
  return (
    <main>
      <h1>Your Profile</h1>

      <EditProfileForm />
    </main>
  );
}
