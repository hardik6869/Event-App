import Button from "../ui/button";

const ResultTitle = (props) => {
  const { date } = props;
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section>
      <h1> Event in {humanReadableDate} </h1>
      <Button link="/events"> Show All Events</Button>
    </section>
  );
};

export default ResultTitle;
