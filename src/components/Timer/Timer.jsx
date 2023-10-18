import React, { useContext, useEffect, useRef, useState } from "react";
import "./Timer.scss";
import TimingPeriod from "../TImingPeriod/TImingPeriod";
import Clock from "../Clock/Clock";
import { AuthContext } from "../../context";

const Timer = () => {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const {
    pomodoroTime,
    setPomodoroTime,
    shortBreakTime,
    setShortBreakTime,
    longBreakTime,
    setLongBreakTime,
  } = useContext(AuthContext);
  const [initialPomodoroTImerValue, setInitialPomodoroTimerValue] = useState();
  const [initialShortBreakTimerValue, setInitialShortBreakTimerValue] =
    useState();
  const [initialLongBreakTImerValue, setInitialLongBreakTImerValue] =
    useState();

  const [isPaused, setIsPaused] = useState(true);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [mode, setMode] = useState("pomodoro");
  const [shouldRestart, setShouldRestart] = useState(false); // Add restart state
  const isPausedRef = useRef(isPaused);
  const secondsRemainingRef = useRef(secondsRemaining);
  const modeRef = useRef(mode);

  //function that opens setting modal
  const openSettingModal = () => {
    setIsSettingOpen(true);
  };

  //function that closes setting modal
  const closeSettingModal = () => {
    setPomodoroTime(initialPomodoroTImerValue);
    setShortBreakTime(initialShortBreakTimerValue);
    setLongBreakTime(initialLongBreakTImerValue);
    setIsSettingOpen(false);
  };

  //function that starts timer
  const startTimer = () => {
    secondsRemainingRef.current = pomodoroTime * 60;
    setSecondsRemaining(secondsRemainingRef.current);
  };

  //function that changes timer period
  const changePeriod = () => {
    let nextPeriod;
    let nextPeriodTime;
    if (modeRef.current === "pomodoro") {
      nextPeriod = "short break";
      nextPeriodTime = shortBreakTime * 60;
    } else if (modeRef.current === "short break") {
      nextPeriod = "long break";
      nextPeriodTime = longBreakTime * 60;
    }
    modeRef.current = nextPeriod;
    setMode(nextPeriod);
    secondsRemainingRef.current = nextPeriodTime;
    setSecondsRemaining(nextPeriodTime);
  };

  //function that decreases time
  const decreaseTime = () => {
    secondsRemainingRef.current--;
    setSecondsRemaining(secondsRemainingRef.current);
  };

  useEffect(() => {
    startTimer();

    const interval = setInterval(() => {
      if (isPausedRef.current) return;

      if (secondsRemainingRef.current === 0) {
        if (modeRef.current === "long break") {
          isPausedRef.current = true;
          setIsPaused(isPausedRef.current);
          setShouldRestart(true);
          // clearInterval(interval);

          // Animation will stop when long break time reaches 0
          return;
        }
        return changePeriod();
      }

      decreaseTime();
    }, 10);

    return () => clearInterval(interval);
  }, [
    pomodoroTime,
    setPomodoroTime,
    shortBreakTime,
    setShortBreakTime,
    longBreakTime,
    setLongBreakTime,
    // isPaused,
  ]);

  let totalSecondsInPercentage;
  if (modeRef.current == "pomodoro") {
    totalSecondsInPercentage = Math.floor(
      (secondsRemaining / (pomodoroTime * 60)) * 100
    );
  } else if (modeRef.current == "short break") {
    totalSecondsInPercentage = Math.floor(
      (secondsRemaining / (shortBreakTime * 60)) * 100
    );
  } else if (modeRef.current == "long break") {
    totalSecondsInPercentage = Math.floor(
      (secondsRemaining / (longBreakTime * 60)) * 100
    );
  }
  const minutes = Math.floor(secondsRemaining / 60);
  let seconds = Math.floor(secondsRemaining % 60);

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  useEffect(() => {
    setInitialPomodoroTimerValue(pomodoroTime);
    setInitialShortBreakTimerValue(shortBreakTime);
    setInitialLongBreakTImerValue(longBreakTime);
  }, []);

  // function that is triggered when apply button is clicked
  const applySettingsHandler = () => {
    console.log("yes");
    setInitialPomodoroTimerValue(pomodoroTime);
    setInitialShortBreakTimerValue(shortBreakTime);
    setInitialLongBreakTImerValue(longBreakTime);
    setIsSettingOpen(false);
  };

  return (
    <>
      <div className={isSettingOpen ? "timer-parent darken" : "timer-parent"}>
        <TimingPeriod />
        <Clock
          totalSecondsInPercentage={totalSecondsInPercentage}
          isPaused={isPaused}
          isPausedRef={isPausedRef}
          minutes={minutes}
          seconds={seconds}
          setIsPaused={setIsPaused}
          startTimer={startTimer}
          secondsRemainingRef={secondsRemainingRef}
          modeRef={modeRef}
          setMode={setMode}
          shouldRestart={shouldRestart}
          setShouldRestart={setShouldRestart}
          secondsRemaining={secondsRemaining}
          setSecondsRemaining={setSecondsRemaining}
        />

        <i className="fas fa-gear" onClick={openSettingModal}></i>
      </div>
      <div className="setting-parent">
        <div
          className={
            isSettingOpen
              ? "inner-setting-container activate"
              : "inner-setting-container"
          }
        >
          <div className="timer-title">
            <h1 className="head">settings</h1>
            <i className="fas fa-times" onClick={closeSettingModal}></i>
          </div>
          <hr />
          <div className="main-setting">
            <div className="timing-periods">
              <p className="sub-title">time (minutes)</p>
              <div className="period-pack">
                <div className="period">
                  <span className="p-title">pomodoro</span>
                  <input
                    type="number"
                    value={pomodoroTime}
                    onChange={(e) => setPomodoroTime(e.target.value)}
                    className="number-input"
                  />
                </div>
                <div className="period">
                  <span className="p-title">short break</span>
                  <input
                    type="number"
                    value={shortBreakTime}
                    onChange={(e) => setShortBreakTime(e.target.value)}
                    className="number-input"
                  />
                </div>
                <div className="period">
                  <span className="p-title">long break</span>
                  <input
                    type="number"
                    value={longBreakTime}
                    onChange={(e) => setLongBreakTime(e.target.value)}
                    className="number-input"
                  />
                </div>
              </div>
            </div>

            <div className="more-setting">
              <h2 className="setting-category">font</h2>
              <div className="font-choices">
                <span className="choice clickedFont">Aa</span>
                <span className="choice">Aa</span>
                <span className="choice">Aa</span>
              </div>
            </div>

            <div className="more-setting">
              <h2 className="setting-category">color</h2>
              <div className="color-choices">
                <span className="color-choice">
                  <i className="fas fa-check"></i>{" "}
                </span>
                <span className="color-choice"></span>
                <span className="color-choice"></span>
              </div>
            </div>
          </div>
          <button className="apply-btn" onClick={applySettingsHandler}>
            apply
          </button>
        </div>
      </div>
    </>
  );
};

export default Timer;
