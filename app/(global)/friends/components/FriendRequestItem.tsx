import { User } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface FriendRequest {
  id: number;
  type: string;
  createdAt: string;
  user_first_id: number;
  user_second_id: number;
  user_first: User;
}

interface FriendRequestItemProps {
  friendRequest: FriendRequest;
  onAccept: (userId: number, friendId: number) => void;
  onReject: (userId: number, friendId: number) => void;
}

export default function FriendRequestItem({
  friendRequest,
  onAccept,
  onReject,
}: FriendRequestItemProps) {
  const router = useRouter();
  const handleAccept = () => {
    onAccept(friendRequest.user_second_id, friendRequest.user_first_id);
    router.refresh();
  };

  const handleReject = () => {
    onReject(friendRequest.user_second_id, friendRequest.user_first_id);
    router.refresh();
  };

  return (
    <li key={`friend-request-${friendRequest.id}`}>
      <div>
        {!!friendRequest.user_first.profilePictureUrl && (
          <Image
            src={friendRequest.user_first.profilePictureUrl}
            alt="Profile Picture"
            width={100}
            height={100}
          />
        )}
        <p>username: {friendRequest.user_first.username}</p>
        <p>climbing level: {friendRequest.user_first.climbingLevel}</p>
      </div>
      <div>
        <button
          className="w-full bg-primary text-secondary hover:bg-secondary hover:text-primary border border-input focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          onClick={handleAccept}
        >
          Accept
        </button>
        <button
          className="w-full bg-primary text-secondary hover:bg-secondary hover:text-primary border border-input focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          onClick={handleReject}
        >
          Reject
        </button>
      </div>
    </li>
  );
}
