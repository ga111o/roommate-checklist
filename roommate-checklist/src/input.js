import React, { useState } from "react";
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

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  return (
    <Container>
      <Div isVisible={currentStep >= 0}>
        <p>성별을 입력해주세요:</p>
        <input type="text" />
        <button onClick={handleNext}>다음</button>
      </Div>
      <Div isVisible={currentStep >= 1}>
        <p>나이를 입력해주세요:</p>
        <input type="number" />
        <button onClick={handleNext}>다음</button>
      </Div>
      <Div isVisible={currentStep >= 2}>
        <p>이름을 입력해주세요:</p>
        <input type="text" />
        <button onClick={handleNext}>완료</button>
      </Div>
    </Container>
  );
};

export default Input;
