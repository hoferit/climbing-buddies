# Climbing Buddies

![Climbing Buddies](/docs/_media/cb_landingpage.png)

## Description

Climbing Buddies is a dedicated social platform for climbers based in Vienna. It enables users to connect with fellow climbers, manage friendships, and organize climbing meetups.

Users can discover potential climbing buddies, send and accept friend requests, and maintain a list of their climbing friends. Personal profiles allow users to showcase their climbing preferences and share important details about themselves. Integrated notifications ensure that users are always updated about their connection requests and profile changes.

Future enhancements include an event creation feature for organizing climbing meetups, a gym listing feature for easy selection of climbing venues, and a chat functionality to facilitate direct communication between users.

Join Climbing Buddies to expand your climbing network, plan exciting climbing events, and enjoy the vibrant climbing community of Vienna!

- **Database Schema:** [DrawSQL Diagram](https://drawsql.app/teams/michaels-team-21/diagrams/climbing-buddies)
- **Wireframe on Figma:** [Figma Design](https://www.figma.com/file/9OsS9OQRaWmXr9tfTiDy1W/Climbing-Buddies?type=design&node-id=77%3A432&mode=design&t=ZyrVCE5JiGSLQPpd-1)

## Technologies Used

The following technologies were used in the development of this project:

- React
- Next.js 13
- Prisma
- Postgres
- TypeScript
- Tailwind CSS
- Notistack Snackbars

## Screenshots

![User Profile](/docs/_media/cb_profile.png)
![Friends and Friend Requests](/docs/_media/cb_friends.png)
![User List](/docs/_media/cb_users.png)

## Setup Instructions

To set up the project locally, please follow these steps:

1. Clone the repository: `git clone https://github.com/hoferit/climbing-buddies.git`
2. Navigate to the project directory: `cd climbing buddies`
3. Install the dependencies: `pnpm install`
4. Create a Postgres database for the project
5. Create a Cloudinary account and get an API Key
6. Set up the environment variables by creating a `.env` file based on the `.env.example` file and updating the necessary values
7. Run the database migrations: `pnpx prisma migrate reset && pnpx prisma db push`
8. Start the development server: `pnpm dev`
9. Open your browser and access the application at `http://localhost:3000`

## Deployment Instructions

To deploy the application via Vercel, follow these instructions:

1. Use the vercel-deploy branch of the project.
2. Create a Postgres storage in vercel
3. Create a Project and overwrite the install command with `pnpm install && pnpx prisma migrate reset && pnpx prisma db push`
4. Connect storage with project in **Project > Storage > Connect**

## Contact Information

For any inquiries, issues, or contributions related to this project, you can reach out in the following ways:

- **Email:** [hoferdev.mi@gmail.com](mailto:hoferdev.mi@gmail.com)
- **LinkedIn:** [Michael Hofer](https://www.linkedin.com/in/michael-hofer-webdev/)
- **GitHub:** [hoferit](https://github.com/hoferit)

Please ensure that you follow the appropriate guidelines when reaching out or contributing to the project.
