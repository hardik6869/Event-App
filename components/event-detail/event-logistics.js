import DateIcon from "../icon/date-icon";
import AddressIcon from "../icon/address-icon";
import classes from "./event-logistics.module.css";
import LogisticsItem from "./logistics-item";
import Image from "next/image";

const Eventlogistics = (props) => {
  const { date, address, image, imageAlt } = props;
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const addressText = address.replace(", ", "\n");

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image src={`/${image}`} alt={imageAlt} height={300} width={300} />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon}>
          <time> {humanReadableDate} </time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address> {addressText} </address>
        </LogisticsItem>
      </ul>
    </section>
  );
};

export default Eventlogistics;
