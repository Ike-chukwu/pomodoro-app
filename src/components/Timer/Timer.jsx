import React, { useState } from "react";
import "./Timer.scss";
import TimingPeriod from "../TImingPeriod/TImingPeriod";
import Clock from "../Clock/Clock";

const Timer = () => {
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  //function that opens setting modal
  const openSettingModal = () => {
    setIsSettingOpen(true);
  };

  //function that closes setting modal
  const closeSettingModal = () => {
    setIsSettingOpen(false);
  };

  return (
    <>
      <div className={isSettingOpen ? "timer-parent darken" : "timer-parent"}>
        <TimingPeriod />
        <Clock />

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
                  <input type="number" className="number-input" />
                </div>
                <div className="period">
                  <span className="p-title">pomodoro</span>
                  <input type="number" className="number-input" />
                </div>
                <div className="period">
                  <span className="p-title">pomodoro</span>
                  <input type="number" className="number-input" />
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
          <button className="apply-btn">apply</button>
        </div>
      </div>
    </>
  );
};

export default Timer;
