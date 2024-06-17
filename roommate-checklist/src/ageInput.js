import React, { useState, useRef } from "react";
import "./ageInput.css";

const AgeInput = () => {
  const ageInputRef = useRef(null);
  const [age, setAge] = useState("05");
  const [animate, setAnimate] = useState("");
  const [clickedButton, setClickedButton] = useState(null);

  const triggerAnimation = (animType) => {
    setAnimate(animType);
    setTimeout(() => setAnimate(""), 300);
  };

  const handleIncrement = () => {
    triggerAnimation("animate-increment");
    animateButton("increment");
    let newAge = parseInt(age, 10);
    if (newAge >= 95 && newAge < 99) {
      newAge += 1;
    } else if (newAge === 99) {
      newAge = 0;
    } else if (newAge >= 0 && newAge < 7) {
      newAge += 1;
    } else if (newAge === 7) {
      newAge = 95;
    }
    setAge(newAge < 10 ? `0${newAge}` : `${newAge}`);
  };

  const handleDecrement = () => {
    triggerAnimation("animate-decrement");
    animateButton("decrement");
    let newAge = parseInt(age, 10);
    if (newAge > 95 && newAge <= 99) {
      newAge -= 1;
    } else if (newAge === 95) {
      newAge = 7;
    } else if (newAge > 0 && newAge <= 7) {
      newAge -= 1;
    } else if (newAge === 0) {
      newAge = 99;
    }
    setAge(newAge < 10 ? `0${newAge}` : `${newAge}`);
  };

  const handleChange = (e) => {
    let value = e.target.value;
    if (value.length === 2 && !isNaN(value)) {
      const numValue = parseInt(value, 10);
      if (
        (numValue >= 95 && numValue <= 99) ||
        (numValue >= 0 && numValue <= 7)
      ) {
        setAge(value);
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
      <div className="ages">
        <input
          className={`no-spinner right-align input-style ${animate}`}
          ref={ageInputRef}
          type="number"
          value={age}
          readOnly
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp") handleIncrement();
            if (e.key === "ArrowDown") handleDecrement();
          }}
        />
        <p>년생</p>
      </div>
      <div className="buttons">
        <button
          id="decrementButton"
          className={`ageButton ${
            clickedButton === "decrementButton" ? "clicked" : ""
          }`}
          onClick={handleDecrement}
        >
          🔽
        </button>
        <button
          id="incrementButton"
          className={`ageButton ${
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

export default AgeInput;
