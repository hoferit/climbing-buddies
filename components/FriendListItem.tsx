import { User } from '@prisma/client';
import Image from 'next/image';

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
    <div>
      {friend.profilePictureUrl !== null && (
        <Image
          src={friend.profilePictureUrl}
          alt={`Profile Picture of ${friend.username}`}
          width={100}
          height={100}
        />
      )}
      <span>{friend.username}</span>
      <button
        className="w-full bg-primary text-secondary hover:bg-secondary hover:text-primary border border-input focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        onClick={handleRemoveFriend}
      >
        Remove Friend
      </button>
    </div>
  );
}
