import Image from 'next/image';

export default function Home() {
  return (
    <section className="bg-primary-background dark:bg-gray-900 mb-auto min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 mx-auto  text-center">
        <Image
          alt="climbing buddies logo"
          src="/cblogo.png"
          height={500}
          width={500}
          unoptimized={true}
        />
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white mb-6">
          Welcome to Climbing Buddies!
        </h1>
        <p className="text-gray-900 dark:text-white text-xl mb-6 max-w-prose mx-auto">
          Your ultimate platform to connect with climbers from around the world.
          Find your perfect climbing partner, explore gyms, plan events, and
          share your climbing experiences.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Make Friends
            </h2>
            <p className="text-gray-900 dark:text-white text-xl">
              Browse the user list, add friends and respond to friend requests.
              Connect with climbers in your area or around the world.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Discover Gyms
            </h2>
            <p className="text-gray-900 dark:text-white text-xl">
              Explore our gym page featuring a list of climbing gyms. Find your
              next climbing destination.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Event Calendar
            </h2>
            <p className="text-gray-900 dark:text-white text-xl">
              Plan climbing events and invite friends. Sync up your climbing
              schedules and never climb alone again.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Chat and Connect
            </h2>
            <p className="text-gray-900 dark:text-white text-xl">
              Our upcoming feature: a chat function for real-time conversation
              with your friends. Connect beyond climbing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
