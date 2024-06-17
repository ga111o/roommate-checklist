import React, { useState, useRef, useEffect } from "react";
import "./hakbunInput.css";

const HakbunInput = () => {
  const hakbunInputRef = useRef(null);
  const [hakbun, setHakbun] = useState("15");
  const [animate, setAnimate] = useState("");
  const [clickedButton, setClickedButton] = useState(null);

  useEffect(() => {
    localStorage.setItem("hakbun", hakbun);
  }, [hakbun]);

  const triggerAnimation = (animType) => {
    setAnimate(animType);
    setTimeout(() => setAnimate(""), 300);
  };

  const triggerInvalidAnimation = () => {
    setAnimate("animate-invalid");
    setTimeout(() => setAnimate(""), 300);
  };

  const handleIncrement = () => {
    let newHakbun = parseInt(hakbun, 10);
    if (newHakbun < 25) {
      triggerAnimation("animate-increment");
      animateButton("increment");
      newHakbun += 1;
      setHakbun(newHakbun < 10 ? `0${newHakbun}` : `${newHakbun}`);
    } else {
      triggerInvalidAnimation();
    }
  };

  const handleDecrement = () => {
    let newHakbun = parseInt(hakbun, 10);
    if (newHakbun > 15) {
      triggerAnimation("animate-decrement");
      animateButton("decrement");
      newHakbun -= 1;
      setHakbun(newHakbun < 10 ? `0${newHakbun}` : `${newHakbun}`);
    } else {
      triggerInvalidAnimation();
    }
  };

  const handleChange = (e) => {
    let value = e.target.value;
    if (value.length === 2 && !isNaN(value)) {
      const numValue = parseInt(value, 10);
      if (numValue >= 15 && numValue <= 25) {
        setHakbun(value);
      } else {
        triggerInvalidAnimation();
      }
    }
  };

  const animateButton = (type) => {
    const button = type === "increment" ? "incrementButton" : "decrementButton";
    setClickedButton(button);
    setTimeout(() => setClickedButton(null), 300);
  };

  return (
    <div className="innerDetailsInput">
      <div className="hakbuns">
        <input
          className={`no-spinner right-align input-style ${animate}`}
          ref={hakbunInputRef}
          type="number"
          value={hakbun}
          readOnly
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp") handleIncrement();
            if (e.key === "ArrowDown") handleDecrement();
          }}
        />
        <p>학번</p>
      </div>
      <div className="buttons">
        <button
          id="decrementButton"
          className={`hakbunButton ${
            clickedButton === "decrementButton" ? "clicked" : ""
          }`}
          onClick={handleDecrement}
        >
          🔽
        </button>
        <button
          id="incrementButton"
          className={`hakbunButton ${
            clickedButton === "incrementButton" ? "clicked" : ""
          }`}
          onClick={handleIncrement}
        >
          🔼
        </button>
      </div>
    </div>
  );
};

export default HakbunInput;
