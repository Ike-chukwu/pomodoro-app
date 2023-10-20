import React, { useContext } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Clock.scss";
import { AuthContext } from "../../context";
import './Styles.css'

const Clock = (props) => {
  const {
    pomodoroTime,
  } = useContext(AuthContext);

  const trailColor = props.color;
  return (
    <div className="clock">
      <div className="inner-clock">
        <CircularProgressbar
          styles={buildStyles({
            // Colors
            pathColor: trailColor,
            textColor: "#d7e0ff",
            trailColor: "#161932",
          })}
          value={props.totalSecondsInPercentage}
          text={`${props.minutes}:${props.seconds}`}
        />

        <div className="inner-text">
          {props.isPaused ? (
            <p
              className="prompt"
              onClick={() => {
                if (props.shouldRestart) {
                  // Reset the timer to the beginning of the Pomodoro sequence
                  props.modeRef.current = "pomodoro";
                  props.setMode("pomodoro");
                  props.secondsRemainingRef.current = pomodoroTime * 60;
                  props.setSecondsRemaining(props.secondsRemainingRef.current);
                  props.setShouldRestart(false);
                  return;
                }
                props.setIsPaused(false);
                props.isPausedRef.current = false;
              }}
            >
              {props.shouldRestart ? "Restart" : "start"}
            </p>
          ) : (
            <p
              className="prompt"
              onClick={() => {
                props.setIsPaused(true);
                props.isPausedRef.current = true;
              }}
            >
              pause
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clock;
