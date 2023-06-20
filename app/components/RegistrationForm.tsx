import React, { useState } from 'react';

export default function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [climbingLevel, setClimbingLevel] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handleFirstNameChange = (event) => setFirstName(event.target.value);
  const handleLastNameChange = (event) => setLastName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleClimbingLevelChange = (event) =>
    setClimbingLevel(event.target.value);
  const handleProfilePictureUrlChange = (event) =>
    setProfilePictureUrl(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Personal Information</legend>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </label>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
      </fieldset>
      <fieldset>
        <legend>Profile Information</legend>
        <label>
          Climbing Level:
          <input
            type="number"
            value={climbingLevel}
            onChange={handleClimbingLevelChange}
            required
          />
        </label>
        <label>
          Profile Picture URL:
          <input
            type="text"
            value={profilePictureUrl}
            onChange={handleProfilePictureUrlChange}
          />
        </label>
      </fieldset>
      <fieldset>
        <legend>Security Information</legend>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
      </fieldset>
      <button type="submit">Register</button>
    </form>
  );
}
