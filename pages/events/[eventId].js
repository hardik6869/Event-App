import Head from "next/head";
import { Fragment } from "react";
import EventContent from "../../components/event-detail/event-content";
import Eventlogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import { getEventById, getFeaturedEvents } from "../../helpers/api-utils";

const EventDetailPage = (props) => {
  const event = props.selectedEvent;
  if (!event) {
    return (
      <div className="center">
        <p> Loading... </p>
      </div>
    );
  }
  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <Eventlogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export const getStaticProps = async (context) => {
  const eventId = await context.params.eventId;
  const event = await getEventById(eventId);
  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return { paths: paths, fallback: "blocking" };
};

export default EventDetailPage;
