import React from "react";
import "./Clock.scss";

const Clock = () => {
  return (
    <div className="clock">
      <div className="inner-circle">
        <div className="inner-text">
          <p className="time">25:00</p>
          <p className="prompt">start</p>
        </div>
      </div>
    </div>
  );
};

export default Clock;
