import { getAllUsers } from '@/database/users';
import Image from 'next/image';
import Link from 'next/link';

export default async function UserList() {
  const users = await getAllUsers();
  return (
    <div>
      <h1>User List</h1>
      {users.map((user) => (
        <div key={`user-div-${user.id}`}>
          <Link href={`/profiles/${user.username}`}>{user.username}</Link>
          <Image
            alt="uploaded"
            fill
            style={{ objectFit: 'cover' }}
            src={`${user.profilePictureUrl}`}
            unoptimized={true}
          />
          <div>First Name: {user.firstName}</div>
          <div>Last Name: {user.lastName}</div>
          <div>Climbing Level: {user.climbingLevel}</div>
        </div>
      ))}
    </div>
  );
}
