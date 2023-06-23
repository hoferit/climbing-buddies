import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <h1>Welcome to ClimbingBuddies, {firstName}!</h1>
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
