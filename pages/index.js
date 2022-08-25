import Head from "next/head";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../dummy_data";

export default function Home() {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <Head>
        <title>Event App</title>
        <meta
          name="description"
          content="find a lot of great events that allow you to evolve.."
        />
      </Head>

      <div>
        <EventList items={featuredEvents} />
      </div>
    </div>
  );
}
