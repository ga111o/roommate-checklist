import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import html2canvas from "html2canvas";
import "./input.css";
import AgeInput from "./ageInput";
import HakbunInput from "./hakbunInput";

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
  transform: translate(-50%, -50%);
  animation: ${({ isVisible }) => (isVisible ? slideIn : "none")} 0.5s forwards;
  z-index: ${({ isVisible }) => (isVisible ? 1 : -1)};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
`;

const Button = styled.button`
  margin: 5px;
  padding: 10px 20px;
  border: none;
  background-color: ${(props) => (props.isSelected ? "#8A1601" : "#fcfcfc")};
  color: ${(props) => (props.isSelected ? "#FFFFFF" : "#000000")};
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  transition: background-size 0.3s ease-out, box-shadow 0.3s,
    background-color 0.3s;
  cursor: pointer;
  &:focus {
    outline: none;
    transition: background-size 0.3s ease-out, box-shadow 0.3s,
      background-color 0.3s;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.6);
  }
`;

const Input = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const [selectedMonth, setSelectedMonth] = useState(
    localStorage.getItem("selectedMonth") || ""
  );
  const [gender, setGender] = useState(localStorage.getItem("gender") || "");
  const [age, setAge] = useState(localStorage.getItem("age") || "");
  const [name, setName] = useState(localStorage.getItem("name") || "");

  const ageInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const resultRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("selectedMonth", selectedMonth);
  }, [selectedMonth]);

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
    if (currentStep === 1) {
      ageInputRef.current.focus();
    } else if (currentStep === 2) {
      nameInputRef.current.focus();
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      alert(
        `성별: ${gender}, 나이: ${age}, 이름: ${name}, 선택한 개월: ${selectedMonth}`
      );
    }
  };

  const handleReset = () => {
    if (window.confirm("정말로 초기화하시겠습니까?")) {
      localStorage.clear();
      setSelectedMonth("");
      setGender("");
      setAge("");
      setName("");
      setCurrentStep(0);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleNext();
    }
  };

  const handleSave = () => {
    if (resultRef.current) {
      html2canvas(resultRef.current, { useCORS: true, logging: true })
        .then((canvas) => {
          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/png");
          link.download = "result.png";
          link.click();
        })
        .catch((error) => {
          console.error("캡처 오류:", error);
        });
    }
  };

  return (
    <Container>
      <Div isVisible={currentStep === 0}>
        <h3>자기소개를 해주세요!</h3>
        <div className="innerDetailsInput">
          <Button
            isSelected={selectedMonth === "4개월"}
            onClick={() => setSelectedMonth("4개월")}
          >
            4개월
          </Button>
          <Button
            isSelected={selectedMonth === "6개월"}
            onClick={() => setSelectedMonth("6개월")}
          >
            6개월
          </Button>
          <Button
            isSelected={selectedMonth === "12개월"}
            onClick={() => setSelectedMonth("12개월")}
          >
            12개월
          </Button>
        </div>

        <div className="innerDetailsInput">
          <Button
            isSelected={gender === "남자"}
            onClick={() => setGender("남자")}
          >
            👨남자
          </Button>
          <Button
            isSelected={gender === "여자"}
            onClick={() => setGender("여자")}
          >
            👧여자
          </Button>
        </div>
        <AgeInput />
        <HakbunInput />

        <button onClick={handleNext}>다음</button>
      </Div>
      <Div isVisible={currentStep === 1}>
        <h3>기본 정보</h3>
        <input
          ref={ageInputRef}
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <p>년생</p>
        <button onClick={handleNext}>다음</button>
      </Div>
      <Div isVisible={currentStep === 2}>
        <p>이름을 입력해주세요:</p>
        <input
          ref={nameInputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleNext}>다음</button>
      </Div>
      <Div isVisible={currentStep === 3}>
        <h3>개월 수를 선택해주세요:</h3>
        <div>
          <Button
            isSelected={selectedMonth === "4개월"}
            onClick={() => setSelectedMonth("4개월")}
          >
            4개월
          </Button>
          <Button
            isSelected={selectedMonth === "6개월"}
            onClick={() => setSelectedMonth("6개월")}
          >
            6개월
          </Button>
          <Button
            isSelected={selectedMonth === "12개월"}
            onClick={() => setSelectedMonth("12개월")}
          >
            12개월
          </Button>
        </div>
        <button onClick={handleNext}>다음</button>
      </Div>
      <div
        className="result"
        ref={resultRef}
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        {currentStep === 4 && (
          <Div isVisible={true}>
            <p>저장된 정보:</p>
            <p>성별: {gender}</p>
            <p>나이: {age}</p>
            <p>이름: {name}</p>
            <p>선택한 개월: {selectedMonth}</p>
            <button onClick={handleSave}>저장하기</button>
            <button onClick={handleReset}>처음으로</button>{" "}
          </Div>
        )}
      </div>
    </Container>
  );
};

export default Input;
