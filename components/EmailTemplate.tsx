import * as React from 'react';

interface EmailTemplateProps {
  username: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  username,
}) => (
  <div>
    <h1>Welcome to ClimbingBuddies, {username}!</h1>
    <p>
      Thank you for signing up for our platform. We're excited to have you
      onboard. Start exploring other climbers and get connected today!
    </p>
    <p>
      Best,
      <br />
      Your ClimbingBuddies Team
    </p>
  </div>
);
