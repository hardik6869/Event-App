import Button from "../ui/button";
import classes from "./result-title.module.css";

const ResultTitle = (props) => {
  const { date } = props;
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={classes.title}>
      <h1> Event in {humanReadableDate} </h1>
      <Button link="/events"> Show All Events</Button>
    </section>
  );
};

export default ResultTitle;
