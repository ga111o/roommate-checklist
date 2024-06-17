import React, { useState, useEffect } from "react";
import "./wakeUp.css";

const WakeUp = () => {
  const [wakeUpTime, setWakeUpTime] = useState(() => {
    return localStorage.getItem("wakeUpTime") || "07:00";
  });

  const [bedTime, setBedTime] = useState(() => {
    return localStorage.getItem("bedTime") || "22:00";
  });

  const [wakeUpAnimationClass, setWakeUpAnimationClass] = useState("");
  const [bedTimeAnimationClass, setBedTimeAnimationClass] = useState("");

  useEffect(() => {
    localStorage.setItem("wakeUpTime", wakeUpTime);
  }, [wakeUpTime]);

  useEffect(() => {
    localStorage.setItem("bedTime", bedTime);
  }, [bedTime]);

  useEffect(() => {
    if (wakeUpAnimationClass) {
      const timeout = setTimeout(() => setWakeUpAnimationClass(""), 300);
      return () => clearTimeout(timeout);
    }
  }, [wakeUpAnimationClass]);

  useEffect(() => {
    if (bedTimeAnimationClass) {
      const timeout = setTimeout(() => setBedTimeAnimationClass(""), 300);
      return () => clearTimeout(timeout);
    }
  }, [bedTimeAnimationClass]);

  const incrementTime = (time) => {
    let [hours, minutes] = time.split(":").map(Number);
    hours = (hours + 1) % 24;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const decrementTime = (time) => {
    let [hours, minutes] = time.split(":").map(Number);
    hours = (hours - 1 + 24) % 24;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const isWakeUpTimeValid = (time) => {
    const [hours] = time.split(":").map(Number);
    return hours >= 5 && hours < 14;
  };

  const isBedTimeValid = (time) => {
    const [hours] = time.split(":").map(Number);
    return hours >= 20 || hours < 4;
  };

  const handleWakeUpTimeChange = (newTime, isIncrement) => {
    if (isWakeUpTimeValid(newTime)) {
      setWakeUpTime(newTime);
      setWakeUpAnimationClass(
        isIncrement ? "animate-increment" : "animate-decrement"
      );
    } else {
      setWakeUpAnimationClass("animate-invalid");
    }
  };

  const handleBedTimeChange = (newTime, isIncrement) => {
    if (isBedTimeValid(newTime)) {
      setBedTime(newTime);
      setBedTimeAnimationClass(
        isIncrement ? "animate-increment" : "animate-decrement"
      );
    } else {
      setBedTimeAnimationClass("animate-invalid");
    }
  };

  return (
    <div className="form-container">
      <form>
        <div className="time-container">
          <label htmlFor="wakeUpTime">기상 시간: </label>
          <span className={wakeUpAnimationClass}>{wakeUpTime}</span>
          <button
            type="button"
            className="time-button"
            onClick={() =>
              handleWakeUpTimeChange(decrementTime(wakeUpTime), false)
            }
          >
            ➖
          </button>
          <button
            type="button"
            className="time-button"
            onClick={() =>
              handleWakeUpTimeChange(incrementTime(wakeUpTime), true)
            }
          >
            ➕
          </button>
        </div>
        <div style={{ marginBottom: "10px" }}></div>
        <div className="time-container">
          <label htmlFor="bedTime">취침 시간: </label>
          <span className={bedTimeAnimationClass}>{bedTime}</span>
          <button
            type="button"
            className="time-button"
            onClick={() => handleBedTimeChange(decrementTime(bedTime), false)}
          >
            ➖
          </button>
          <button
            type="button"
            className="time-button"
            onClick={() => handleBedTimeChange(incrementTime(bedTime), true)}
          >
            ➕
          </button>
        </div>
      </form>
    </div>
  );
};

export default WakeUp;
