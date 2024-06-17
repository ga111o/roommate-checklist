import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import html2canvas from "html2canvas";
import "./input.css";
import AgeInput from "./ageInput";
import HakbunInput from "./hakbunInput";
import GenderSelect from "./gender";
import TermSelect from "./term";

const Input = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const [selectedMonth, setSelectedMonth] = useState(
    () => localStorage.getItem("selectedMonth") || "12개월"
  );
  const [gender, setGender] = useState(
    () => localStorage.getItem("gender") || "여자"
  );
  const [age, setAge] = useState(() => localStorage.getItem("age") || "95");
  const [name, setName] = useState(() => localStorage.getItem("name") || "");
  const [hakbun, setHakbun] = useState(
    () => localStorage.getItem("hakbun") || "15"
  );

  const resultRef = useRef(null);

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
    localStorage.setItem("name", name);
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
    if (window.confirm("정말로 초기화하시겠습니까?")) {
      localStorage.clear();
      localStorage.setItem("selectedMonth", "12개월");
      localStorage.setItem("gender", "남자");
      localStorage.setItem("age", "95");
      localStorage.setItem("hakbun", "15");
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
        <h3>기본 정보</h3>
        <button onClick={handleNext}>다음</button>
      </Div>
      <Div isVisible={currentStep === 2}>
        <p>이름을 입력해주세요:</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleNext}>다음</button>
      </Div>
      <Div isVisible={currentStep === 3}>
        <h3>개월 수를 선택해주세요:</h3>
        <div></div>
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
            <button onClick={handleSave}>저장하기</button>
            <button onClick={handleReset}>처음으로</button>{" "}
          </Div>
        )}
      </div>
    </Container>
  );
};

export default Input;
