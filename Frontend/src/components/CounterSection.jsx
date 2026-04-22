import React from "react";
import CounterItem from "./CounterItem";
import "../assets/css/CounterSection.css";

const CounterSection = () => {
  return (
    <div className="counter-container">
      <CounterItem end={350} label="Hours of Works" />
      <CounterItem end={80} label="Happy Customers" />
      <CounterItem end={50} label="Experienced Workers" />
      <CounterItem end={30} label="Years of Experience" />
      <CounterItem end={100} label="Satisfaction Rate" suffix="%" />
    </div>
  );
};

export default CounterSection;