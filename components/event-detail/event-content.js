import classes from "./event-content.module.css";

const EventContent = (props) => {
  const { text } = props;
  return <section className={classes.content}>{props.children} </section>;
};

export default EventContent;
