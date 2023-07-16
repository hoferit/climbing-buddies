export default function Home() {
  return (
    <section
      className="relative min-h-screen flex flex-col bg-primary-background dark:bg-gray-900 text-secondary"
      style={{
        backgroundImage: "url('/mountain.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative flex flex-col justify-end px-6 mx-auto text-center bg-black bg-opacity-30">
        <h1 className="text-8xl font-bold leading-tight tracking-tight mb-6">
          Welcome to
        </h1>
        <h1 className="text-8xl font-bold leading-tight tracking-tight mb-6">
          Climbing Buddies!
        </h1>
        <p className="text-2xl mb-6 max-w-prose mx-auto">
          Your ultimate platform to connect with climbers from around the world.
          Find your perfect climbing partner, explore gyms, plan events, and
          share your climbing experiences.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div>
            <h2 className="text-3xl font-bold">Make Friends</h2>
            <p className="text-xl">
              Browse the user list, add friends and respond to friend requests.
              Connect with climbers in your area or around the world.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold">Discover Gyms</h2>
            <p className="text-xl">
              Explore our gym page featuring a list of climbing gyms. Find your
              next climbing destination.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold">Event Calendar</h2>
            <p className="text-xl">
              Plan climbing events and invite friends. Sync up your climbing
              schedules and never climb alone again.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold">Chat and Connect</h2>
            <p className="text-xl">
              Our upcoming feature: a chat function for real-time conversation
              with your friends. Connect beyond climbing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
