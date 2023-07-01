import { getAllUsers } from '@/database/users';
import { authorizeAndAuthenticate } from '@/utils/auth';
import Image from 'next/image';
import Link from 'next/link';
import AddFriendButton from './AddFriendButton';

export default async function UserList() {
  const session = await authorizeAndAuthenticate();

  const users:
    | {
        id: number;
        username: string;
        firstName: string | null;
        lastName: string | null;
        climbingLevel: string | null;
        profilePictureUrl: string | null;
      }[]
    | null = await getAllUsers();

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User List</h1>
      {users.map((user) => (
        <div key={`user-div-${user.id}`}>
          <Link href={`/users/${user.username}`}>{user.username}</Link>
          {user.profilePictureUrl ? (
            <Image
              alt="uploaded"
              src={user.profilePictureUrl}
              unoptimized={true}
              width={400}
              height={400}
            />
          ) : (
            <p>No profile picture available</p>
          )}
          <div>First Name: {user.firstName}</div>
          <div>Last Name: {user.lastName}</div>
          <div>Climbing Level: {user.climbingLevel}</div>
          {user.id !== session.userId && <AddFriendButton friendId={user.id} />}
        </div>
      ))}
    </div>
  );
}
