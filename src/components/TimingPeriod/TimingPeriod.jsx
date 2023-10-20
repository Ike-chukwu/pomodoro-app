import React, { useEffect, useRef } from "react";
import "./TImingPeriod.css";

const TimingPeriod = (props) => {
  const periods = ["pomodoro", "short break", "long break"];

  

  return (
    <div className="timing-period">
      <h2 className="heading">pomodoro</h2>

      <div className="categories">
        {periods.map((period) => {
          if (props.modeRef.current == period) {
            return (
              <div key={period}  className="category active">
                {period}
              </div>
            );
          }
          return (
            <div key={period} className="category">
              {period}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimingPeriod;
