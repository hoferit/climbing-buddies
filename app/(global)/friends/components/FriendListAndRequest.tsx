'use client';
import { SnackbarProvider } from 'notistack';
import FriendList from './FriendList';
import FriendRequestList from './FriendRequestList';

export default function FriendListAndRequest() {
  return (
    <div>
      <SnackbarProvider maxSnack={3}>
        <FriendList />

        <FriendRequestList />
      </SnackbarProvider>
    </div>
  );
}
