import React, { useContext, useEffect, useRef, useState } from "react";
import "./Timer.scss";
import TimingPeriod from "../TimingPeriod/TimingPeriod";
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
  const fontFamilies = ["Roboto", "Montserrat", "Playfair Display"];
  const colors = ["#f87070", "#70f3f8", "#d881f8"];

  const [isPaused, setIsPaused] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [mode, setMode] = useState("pomodoro");
  const [shouldRestart, setShouldRestart] = useState(false); // Add restart state
  const isPausedRef = useRef(isPaused);
  const secondsRemainingRef = useRef(secondsRemaining);
  const modeRef = useRef(mode);
  const [curentFont, setCurrentFont] = useState("Roboto");
  const [initialFont, setInitialFont] = useState();
  const [curentColor, setCurrentColor] = useState("#f87070");
  const [initialColor, setInitialColor] = useState();

  ///refs for elements that change color when the apply button is clikced
  const btnRef = useRef();

  //function that opens setting modal
  const openSettingModal = () => {
    if (!isPausedRef.current) {
      setShowErrorMessage(true);
      return;
    }
    setIsSettingOpen(true);
  };

  //function that closes setting modal
  const closeSettingModal = () => {
    setPomodoroTime(initialPomodoroTImerValue);
    setShortBreakTime(initialShortBreakTimerValue);
    setLongBreakTime(initialLongBreakTImerValue);
    setIsSettingOpen(false);
    setCurrentFont(initialFont);
    setCurrentColor(initialColor);
    document.documentElement.style.setProperty("--my-variable", initialColor);
    btnRef.current.style.background = initialColor;
    const body = document.querySelector("body");
    (body.style.fontFamily = `${initialFont}`), "serif";
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

  // function that is triggered when apply button is clicked
  const applySettingsHandler = (fontStyle) => {
    setInitialPomodoroTimerValue(pomodoroTime);
    setInitialShortBreakTimerValue(shortBreakTime);
    setInitialLongBreakTImerValue(longBreakTime);
    setIsSettingOpen(false);
    setInitialColor(curentColor);
    setInitialFont(curentFont);
    const body = document.querySelector("body");
    (body.style.fontFamily = `${curentFont}`), "serif";
    document.documentElement.style.setProperty("--my-variable", curentColor);
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
          clearInterval(interval);

          // Animation will stop when long break time reaches 0
          return;
        }
        return changePeriod();
      }

      decreaseTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [
    pomodoroTime,
    setPomodoroTime,
    shortBreakTime,
    setShortBreakTime,
    longBreakTime,
    setLongBreakTime,
  ]);

  
  useEffect(() => {
    setInitialPomodoroTimerValue(pomodoroTime);
    setInitialShortBreakTimerValue(shortBreakTime);
    setInitialLongBreakTImerValue(longBreakTime);
    setInitialFont(curentFont);
    setInitialColor(curentColor);
  }, []);

  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowErrorMessage(false);
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, [showErrorMessage]);

  
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

  return (
    <>
      <div className={isSettingOpen ? "timer-parent darken" : "timer-parent"}>
        <TimingPeriod modeRef={modeRef} />
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
          color={curentColor}
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
                    onChange={(e) => {
                      if (e.target.value <= 1) {
                        setPomodoroTime(1);
                        return;
                      }
                      setPomodoroTime(e.target.value);
                    }}
                    className="number-input"
                    readOnly={
                      modeRef.current !== "pomodoro" ? "readonly" : null
                    }
                  />
                </div>
                <div className="period">
                  <span className="p-title">short break</span>
                  <input
                    type="number"
                    value={shortBreakTime}
                    onChange={(e) => {
                      if (e.target.value <= 1) {
                        setShortBreakTime(1);
                        return;
                      }
                      setShortBreakTime(e.target.value);
                    }}
                    className="number-input"
                    readOnly={
                      modeRef.current !== "pomodoro" ? "readonly" : null
                    }
                  />
                </div>
                <div className="period">
                  <span className="p-title">long break</span>
                  <input
                    type="number"
                    value={longBreakTime}
                    onChange={(e) => {
                      if (modeRef.current == "long break") {
                        modeRef.current = "pomodoro";
                      }
                      if (e.target.value <= 1) {
                        setLongBreakTime(1);
                        return;
                      }
                      setLongBreakTime(e.target.value);
                    }}
                    className="number-input"
                    readOnly={
                      modeRef.current !== "pomodoro" ? "readonly" : null
                    }
                  />
                </div>
              </div>
            </div>

            <div className="more-setting">
              <h2 className="setting-category">font</h2>
              <div className="font-choices">
                {fontFamilies.map((font) => {
                  if (font == curentFont) {
                    return (
                      <span key={font} className="choice clickedFont">
                        Aa
                      </span>
                    );
                  }
                  return (
                    <span
                      key={font}
                      onClick={() => {
                        setCurrentFont(font);
                        const body = document.querySelector("body");
                        (body.style.fontFamily = `${font}`), "serif";
                      }}
                      className="choice"
                    >
                      Aa
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="more-setting">
              <h2 className="setting-category">color</h2>
              <div className="color-choices">
                {colors.map((color) => {
                  if (color == curentColor) {
                    return (
                      <span className="color-choice" key={color}>
                        <i className="fas fa-check"></i>
                      </span>
                    );
                  }
                  return (
                    <span
                      key={color}
                      onClick={() => {
                        setCurrentColor(color);
                        btnRef.current.style.background = color;
                        document.documentElement.style.setProperty(
                          "--my-variable",
                          color
                        );
                      }}
                      className="color-choice"
                    ></span>
                  );
                })}
              </div>
            </div>
          </div>
          <button
            className="apply-btn"
            onClick={() => applySettingsHandler(curentFont)}
            ref={btnRef}
          >
            apply
          </button>
        </div>
      </div>

      <div
        className={
          showErrorMessage ? "timer-errorMessage show" : "timer-errorMessage"
        }
      >
        <h2>You can't access the settings until the timer is complete!</h2>
      </div>
    </>
  );
};

export default Timer;
