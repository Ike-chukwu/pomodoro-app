import React, { useContext } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Clock.scss";
import { AuthContext } from "../../context";

const Clock = (props) => {
  console.log(props.minutes, props.secondsRemainingRef.current);
  const {
    pomodoroTime,
    setPomodoroTime,
    shortBreakTime,
    setShortBreakTime,
    longBreakTime,
    setLongBreakTime,
  } = useContext(AuthContext);
  return (
    <div className="clock">
      <CircularProgressbar
        styles={buildStyles({
          // Colors
          pathColor: `red`,
          textColor: "#f88",
          trailColor: "#d6d6d6",
          backgroundColor: "#3e98c7",
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
                return
              }
              props.setIsPaused(false);
              props.isPausedRef.current = false;
            }}
          >
            start
          </p>
        ) : (
          <p
            className="prompt"
            onClick={() => {
              props.setIsPaused(true);
              props.isPausedRef.current = true;
            }}
          >
            paused
          </p>
        )}
      </div>
    </div>
  );
};

export default Clock;
