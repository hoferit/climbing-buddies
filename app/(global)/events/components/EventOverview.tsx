import Link from 'next/link';

export default function EventOverview() {
  return (
    <>
      <section>
        <h1>Events</h1>
        <Link href="/create-event">Create Event</Link>
      </section>
      <section>
        <h2>Search Bar and filters</h2>
      </section>
      <section>
        <h2>Event List</h2>
      </section>
    </>
  );
}
