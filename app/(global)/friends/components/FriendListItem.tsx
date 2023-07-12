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
    <>
      <td className="px-5 py-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-20 h-28">
            {friend.profilePictureUrl ? (
              <Link href={`/users/${friend.username}`}>
                <Image
                  src={friend.profilePictureUrl}
                  alt={`Profile Picture of ${friend.username}`}
                  priority={true}
                  unoptimized={true}
                  width={100}
                  height={100}
                />
              </Link>
            ) : (
              <p>No profile picture available</p>
            )}
          </div>
        </div>
      </td>

      <td className="py-5">
        <p className="text-gray-900 whitespace-no-wrap">
          <strong>Username:</strong> {friend.username}
        </p>
      </td>
      <td className="hidden xl:table-cell py-5">
        <p className="text-gray-900 whitespace-no-wrap">
          <strong>First Name:</strong> {friend.firstName}
        </p>
      </td>
      <td className="hidden xl:table-cell py-5">
        <p className="text-gray-900 whitespace-no-wrap">
          <strong>Last Name:</strong> {friend.lastName}
        </p>
      </td>
      <td className="text-center py-5">
        <button
          className="bg-primary text-secondary hover:bg-secondary hover:text-primary border border-input focus:ring-4 font-medium rounded-lg text-xs px-4 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          onClick={handleRemoveFriend}
        >
          Remove Friend
        </button>
      </td>
    </>
  );
}
