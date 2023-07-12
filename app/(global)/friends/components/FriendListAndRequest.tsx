'use client';
import { SnackbarProvider } from 'notistack';
import { useState } from 'react';
import FriendList from './FriendList';
import FriendRequestList from './FriendRequestList';

export default function FriendListAndRequest() {
  const [triggerFetch, setTriggerFetch] = useState<boolean>(false);

  return (
    <div>
      <SnackbarProvider maxSnack={3}>
        <FriendRequestList setTriggerFetch={setTriggerFetch} />
        <FriendList
          triggerFetch={triggerFetch}
          setTriggerFetch={setTriggerFetch}
        />
      </SnackbarProvider>
    </div>
  );
}
