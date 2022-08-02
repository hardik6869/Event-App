import Head from "next/head";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../dummy_data";

export default function Home() {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      <div>
        <EventList items={featuredEvents} />
      </div>
    </div>
  );
}
