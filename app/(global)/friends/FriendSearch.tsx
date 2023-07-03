import React, { useState } from 'react';

type FriendSearchProps = {
  onSearch: (searchTerm: string) => void;
};

export default function FriendSearch({ onSearch }: FriendSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="friend-search">
      <form onSubmit={handleSubmit}>
        <input
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search Friends"
        />
        <button>Search</button>
      </form>
    </div>
  );
}
