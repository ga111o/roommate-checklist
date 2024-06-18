import "./smoking.css";
import React, { useState, useEffect } from "react";

const Alarm = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [checkboxImage, setCheckboxImage] = useState("☐");

  useEffect(() => {
    const savedStatus = localStorage.getItem("alarm");
    if (savedStatus !== null) {
      setClickCount(parseInt(savedStatus, 10) === 1 ? 1 : 0);
    }
  }, []);

  useEffect(() => {
    const status = clickCount % 2 !== 0 ? 1 : 0;
    localStorage.setItem("alarm", status);

    const newImage = getCheckboxImage(clickCount);
    if (isFadingOut) {
      setTimeout(() => {
        setCheckboxImage(newImage);
        setIsFadingOut(false);
      }, 500);
    } else {
      setCheckboxImage(newImage);
    }
  }, [clickCount, isFadingOut]);

  const handleCheckboxChange = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setClickCount((prevCount) => prevCount + 1);
    }, 500);
  };

  const getCheckboxImage = (count) => {
    if (count === 0) {
      return "☐";
    } else if (count % 2 !== 0) {
      return (
        <div>
          <div>🔊</div>
          <div className="output">알람 소리에 민감해요.</div>
        </div>
      );
    } else {
      return (
        <div>
          <div>🔈</div>
          <div className="output">알람 소리에 민감하지 않아요.</div>
        </div>
      );
    }
  };

  return (
    <div className="smoke">
      <label>
        <div>알람 소리</div>
        <span
          role="checkbox"
          aria-checked={clickCount % 2 !== 0}
          onClick={handleCheckboxChange}
          className={isFadingOut ? "fade-out" : ""}
          style={{ cursor: "pointer", fontSize: "1.5em", marginLeft: "8px" }}
        >
          {checkboxImage}
        </span>
      </label>
    </div>
  );
};

export default Alarm;
