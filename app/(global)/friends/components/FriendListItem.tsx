import { User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

type FriendListItemProps = {
  friend: User;
  onRemoveFriend: (friendId: number) => void;
};

export default function FriendListItem({
  friend,
  onRemoveFriend,
}: FriendListItemProps) {
  const handleRemoveFriend = () => {
    onRemoveFriend(friend.id);
  };

  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 w-20 h-28">
        {friend.profilePictureUrl ? (
          <Link href={`/users/${friend.username}`}>
            <Image
              alt="profile picture"
              src={friend.profilePictureUrl}
              unoptimized={true}
              width={200}
              height={200}
            />
          </Link>
        ) : (
          <p>No profile picture available</p>
        )}
      </div>
      <div className="ml-5 flex-grow">
        <p className="text-gray-900 whitespace-no-wrap">
          <strong>First Name:</strong> {friend.firstName}
        </p>
        <p className="text-gray-900 whitespace-no-wrap">
          <strong>Last Name:</strong> {friend.lastName}
        </p>
      </div>
      <div className="mt-2 flex-shrink-0">
        <button
          className="bg-primary text-secondary hover:bg-secondary hover:text-primary border border-input focus:ring-4 font-medium rounded-lg text-xs px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          onClick={handleRemoveFriend}
        >
          Remove Friend
        </button>
      </div>
    </div>
  );
}
