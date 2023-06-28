import Image from 'next/image';

type FriendListItemProps = {
  friend: {
    id: number;
    username: string;
    profilePictureUrl: string | null;
    climbingLevel: string;
  };
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
    <div className="friend-list-item">
      {friend.profilePictureUrl !== null && (
        <Image
          src={friend.profilePictureUrl}
          alt={`Profile Picture of ${friend.username}`}
          className="friend-list-item__avatar"
        />
      )}
      <span className="friend-list-item__username">{friend.username}</span>
      <button onClick={handleRemoveFriend}>Remove Friend</button>
    </div>
  );
}
