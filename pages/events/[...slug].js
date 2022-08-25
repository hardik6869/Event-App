import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import ResultTitle from "../../components/events/result-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../helpers/api-utils";

const FilteredEventsPage = (props) => {
  const router = useRouter();
  const filterData = router.query.slug;

  const pageHeadData = (
    <Head>
      <title>Filtered Event</title>
      <meta
        name="description"
        content={`All Events for ${props.date.numMonth}/${props.date.numYear}`}
      />
    </Head>
  );

  if (!filterData) {
    return (
      <ErrorAlert>
        {pageHeadData}
        <p className="center"> Loading... </p>
      </ErrorAlert>
    );
  }

  if (props.hasError) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p> Invalid Filter. Please adjust your value!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events"> Show All Events</Button>
        </div>
      </Fragment>
    );
  }
  const filteredEvent = props.events;

  if (!filteredEvent || filteredEvent === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p> No Event Found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events"> Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <Fragment>
      {pageHeadData}
      <ResultTitle date={date} />
      <EventList items={filteredEvent} />
    </Fragment>
  );
};

export const getServerSideProps = async (context) => {
  const { params } = context;

  const filterData = params.slug;
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2020 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: { hasError: true },
      // notfound: true,
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        month: numMonth,
        year: numYear,
      },
    },
  };
};

export default FilteredEventsPage;
