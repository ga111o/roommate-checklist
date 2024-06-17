import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
`;

const Div = styled.div`
  background-color: white;
  width: 300px;
  padding: 20px;
  margin: 20px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${({ isVisible }) => (isVisible ? slideIn : "none")} 0.5s forwards;
  z-index: ${({ isVisible }) => (isVisible ? 1 : -1)};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
`;

const Input = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [gender, setGender] = useState(localStorage.getItem("gender") || "");
  const [age, setAge] = useState(localStorage.getItem("age") || "");
  const [name, setName] = useState(localStorage.getItem("name") || "");

  const genderInputRef = useRef(null);
  const ageInputRef = useRef(null);
  const nameInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("gender", gender);
  }, [gender]);

  useEffect(() => {
    localStorage.setItem("age", age);
  }, [age]);

  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);

  useEffect(() => {
    if (currentStep === 0) {
      genderInputRef.current.focus();
    } else if (currentStep === 1) {
      ageInputRef.current.focus();
    } else if (currentStep === 2) {
      nameInputRef.current.focus();
    }
  }, [currentStep]);

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleNext();
    }
  };

  return (
    <Container>
      <Div isVisible={currentStep >= 0}>
        <p>성별을 입력해주세요:</p>
        <input
          ref={genderInputRef}
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleNext}>다음</button>
      </Div>
      <Div isVisible={currentStep >= 1}>
        <p>나이를 입력해주세요:</p>
        <input
          ref={ageInputRef}
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleNext}>다음</button>
      </Div>
      <Div isVisible={currentStep >= 2}>
        <p>이름을 입력해주세요:</p>
        <input
          ref={nameInputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleNext}>완료</button>
      </Div>
    </Container>
  );
};

export default Input;
