import { useRouter } from "next/router";
import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import ResultTitle from "../../components/events/result-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../dummy_data";

const FilteredEventsPage = (props) => {
  const router = useRouter();
  const filterData = router.query.slug;
  console.log(filterData);

  if (!filterData) {
    return (
      <ErrorAlert>
        <p className="center"> Loading... </p>
      </ErrorAlert>
    );
  }
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
    return (
      <Fragment>
        <ErrorAlert>
          <p> Invalid Filter. Please adjust your value!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events"> Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvent = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvent || filteredEvent === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p> No Event Found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events"> Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultTitle date={date} />
      <EventList items={filteredEvent} />
    </Fragment>
  );
};

export default FilteredEventsPage;
