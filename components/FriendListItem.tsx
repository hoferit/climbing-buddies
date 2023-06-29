import Image from 'next/image';

type Friendship = {
  id: number;
  user: User;
};

type User = {
  id: number;
  username: string;
  profilePictureUrl: string | null;
  climbingLevel: string | null;
};

type FriendListItemProps = {
  friend: Friendship;
  onRemoveFriend: (friendshipId: number) => void;
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
      {friend.user.profilePictureUrl !== null && (
        <Image
          src={friend.user.profilePictureUrl}
          alt={`Profile Picture of ${friend.user.username}`}
          width={100}
          height={100}
        />
      )}
      <span>{friend.user.username}</span>
      <button onClick={handleRemoveFriend}>Remove Friend</button>
    </div>
  );
}
