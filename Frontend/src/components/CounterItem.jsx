import React, { useEffect, useState } from "react";

const CounterItem = ({ end, label, suffix = "+" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        start = end;
        clearInterval(timer);
      }

      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="counter-box">
      <h1>
        {count}
        <span className="symbol">{suffix}</span>
      </h1>
      <p>{label}</p>
    </div>
  );
};

export default CounterItem;