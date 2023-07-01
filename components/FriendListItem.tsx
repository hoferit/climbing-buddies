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
      <button onClick={handleRemoveFriend}>Remove Friend</button>
    </div>
  );
}
