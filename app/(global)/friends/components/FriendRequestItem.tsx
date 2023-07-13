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
    <div className="py-4 flex items-start justify-between">
      <div className="flex items-center">
        <div className="flex-shrink-0 w-20 h-28">
          {!!friendRequest.user_first.profilePictureUrl && (
            <Image
              src={friendRequest.user_first.profilePictureUrl}
              alt="Profile Picture"
              priority={true}
              unoptimized={true}
              width={150}
              height={150}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="mb-2">
          <p className="text-gray-900 whitespace-no-wrap text-sm">
            <strong>Username:</strong> {friendRequest.user_first.username}
          </p>
        </div>
        <div className="flex items-center">
          <button
            className="bg-primary text-secondary hover:bg-secondary hover:text-primary border-2 border-green-600 border-input focus:ring-2 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={handleAccept}
          >
            Accept
          </button>
          <button
            className="bg-primary text-secondary hover:bg-secondary hover:text-primary border border-input focus:ring-2 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={handleReject}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
