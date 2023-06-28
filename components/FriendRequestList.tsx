interface User {
  id: number;
  username: string;
}

interface FriendRequestListProps {
  friendRequests: User[];
  onAccept: (friendId: number) => void;
  onReject: (friendId: number) => void;
}

export default function FriendRequestList({
  friendRequests,
  onAccept,
  onReject,
}: FriendRequestListProps) {
  return (
    <div>
      <h2>Friend Requests</h2>
      {friendRequests.length > 0 ? (
        <ul>
          {friendRequests.map((friend) => (
            <li key={`friend-${friend.id}`}>
              {friend.username}
              <button onClick={() => onAccept(friend.id)}>Accept</button>
              <button onClick={() => onReject(friend.id)}>Reject</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No friend requests.</p>
      )}
    </div>
  );
}
