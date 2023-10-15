import React from "react";
import "./TImingPeriod.scss";

const TimingPeriod = () => {
  return (
    <div className="timing-period">
      <h2 className="heading">pomodoro</h2>

      <div className="categories">
        <div className="category active">pomodoro</div>
        <div className="category">short break</div>
        <div className="category">long break</div>
      </div>
    </div>
  );
};

export default TimingPeriod;
