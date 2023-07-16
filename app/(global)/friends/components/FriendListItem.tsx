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
    <div className="py-4 flex items-start justify-between">
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
        <div className="flex flex-col items-start">
          <div className="ml-14 flex-grow">
            <p className="text-gray-900 whitespace-no-wrap text-sm">
              <strong>First Name:</strong> {friend.firstName}
            </p>
            <p className="text-gray-900 whitespace-no-wrap text-sm">
              <strong>Last Name:</strong> {friend.lastName}
            </p>
          </div>
          <div className="mt-2 flex-shrink-0 self-end">
            <button
              className="bg-primary text-secondary hover:bg-secondary hover:text-primary border border-input focus:ring-4 font-medium rounded-lg text-xs px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              onClick={handleRemoveFriend}
            >
              Remove Friend
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
