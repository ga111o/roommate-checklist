import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import html2canvas from "html2canvas";
import "./input.css";
import AgeInput from "./ageInput";
import HakbunInput from "./hakbunInput";
import GenderSelect from "./gender";
import TermSelect from "./term";

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
    () => localStorage.getItem("selectedMonth") || "12개월"
  );
  const [gender, setGender] = useState(
    () => localStorage.getItem("gender") || "여자"
  );
  const [age, setAge] = useState(() => localStorage.getItem("age") || "95");
  const [name, setName] = useState(() => {
    const savedName = localStorage.getItem("name");
    return savedName ? savedName.replace(/&#10;/g, "\n") : "";
  });
  const [hakbun, setHakbun] = useState(
    () => localStorage.getItem("hakbun") || "15"
  );

  const resultRef = useRef(null);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
  };

  useEffect(() => {
    localStorage.setItem("selectedMonth", selectedMonth);
  }, [selectedMonth]);

  useEffect(() => {
    localStorage.setItem("gender", gender);
  }, [gender]);

  useEffect(() => {
    localStorage.setItem("hakbun", hakbun);
  }, [hakbun]);

  useEffect(() => {
    localStorage.setItem("age", age);
  }, [age]);

  useEffect(() => {
    const encodedName = name.replace(/\n/g, "&#10;");
    localStorage.setItem("name", encodedName);
  }, [name]);

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
    if (window.confirm("입력된 정보를 초기화할까요?")) {
      localStorage.clear();
      localStorage.setItem("selectedMonth", "4개월");
      localStorage.setItem("gender", "남자");
      localStorage.setItem("age", "95");
      localStorage.setItem("hakbun", "15");

      setSelectedMonth("4개월");
      setGender("남자");
      setAge("95");
      setName("");
      setHakbun("15");
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
        <TermSelect />
        <GenderSelect />
        <AgeInput />
        <HakbunInput />

        <button onClick={handleNext}>다음</button>
      </Div>
      <Div isVisible={currentStep === 1}>
        <h3>자기소개를 해주세요!</h3>
        <button onClick={handleNext}>다음</button>
      </Div>
      <Div isVisible={currentStep === 2}>
        <h3>제 룸메는 이랬으면 좋겠어요!</h3>
        <button onClick={handleNext}>다음</button>
      </Div>
      <Div isVisible={currentStep === 3}>
        <h3>룸메님, 이건 지켜 주세요!</h3>
        <textarea
          placeholder="없다면 넘어가도 무방해요."
          type="text"
          value={name}
          onChange={handleNameChange}
        />
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
            <p>성별: {localStorage.gender}</p>
            <p>나이: {localStorage.age}</p>
            <p>학번: {localStorage.hakbun}</p>
            <p>선택한 개월: {localStorage.selectedMonth}</p>
            <p>룸메님 이건 지켜주세요!</p>
            <p
              dangerouslySetInnerHTML={{
                __html: localStorage.name.replace(/&#10;/g, "<br />"),
              }}
            ></p>
            <button onClick={handleSave}>저장하기</button>
            <button onClick={handleReset}>처음으로</button>
          </Div>
        )}
      </div>
    </Container>
  );
};

export default Input;
