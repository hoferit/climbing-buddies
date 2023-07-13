'use client';
import { SnackbarProvider } from 'notistack';
import { useState } from 'react';
import FriendList from './FriendList';
import FriendRequestList from './FriendRequestList';

export default function FriendListAndRequest() {
  const [triggerFetch, setTriggerFetch] = useState<boolean>(false);

  return (
    <div className="flex justify-between">
      <SnackbarProvider maxSnack={3}>
        <FriendList
          triggerFetch={triggerFetch}
          setTriggerFetch={setTriggerFetch}
        />
        <FriendRequestList setTriggerFetch={setTriggerFetch} />
      </SnackbarProvider>
    </div>
  );
}
