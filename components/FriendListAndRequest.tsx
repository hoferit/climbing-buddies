'use client';
import FriendRequestList from '@/components/FriendRequestList';
import React, { useEffect, useState } from 'react';
import FriendList from './FriendList';

export default function FriendListAndRequest() {
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    // Fetch friend requests data from the API
    const fetchFriendRequests = async () => {
      try {
        const response = await fetch('/api/retrievefriendrequests');
        const data = await response.json();
        setFriendRequests(data.friendRequests);
      } catch (error) {
        console.error('Error retrieving friend requests:', error);
      }
    };

    fetchFriendRequests().catch(() => {
      console.error('Error fetching friend requests');
    });
  }, []);

  // Callback functions for accepting and rejecting friend requests
  async function handleAcceptFriendRequest(friendId: number) {
    try {
      await fetch('/api/acceptrequest', {
        method: 'PUT',
        body: JSON.stringify({ friendId }),
      });
    } catch (error) {
      console.error('Error accepting friend request');
    }
  }

  async function handleRejectFriendRequest(friendId: number) {
    try {
      await fetch('/api/rejectrequest', {
        method: 'PUT',
        body: JSON.stringify({ friendId }),
      });
    } catch (error) {
      console.error('Error rejecting friend request');
    }
  }

  return (
    <div>
      <h1>Friends Page</h1>
      <FriendList />
      <FriendRequestList
        friendRequests={friendRequests}
        onAccept={handleAcceptFriendRequest}
        onReject={handleRejectFriendRequest}
      />
    </div>
  );
}
