import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import html2canvas from "html2canvas";
import "./input.css";
import AgeInput from "./ageInput";
import HakbunInput from "./hakbunInput";
import GenderSelect from "./gender";
import TermSelect from "./term";
import WakeUp from "./wakeUp";
import MbtiSelector from "./mbti";
import SmokingStatus from "./smoking";
import Clean from "./clean";
import Alarm from "./alarm";
import WhenSleep from "./whenSleep";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
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
  height: 450px;
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
    return savedName !== null ? savedName.replace(/&#10;/g, "\n") : "";
  });

  const [hakbun, setHakbun] = useState(
    () => localStorage.getItem("hakbun") || "15"
  );

  const [smokingStatus, setSmokingStatus] = useState(
    () => localStorage.getItem("smokingStatus") || "0"
  );

  const [whenSleep, setWhenSleep] = useState(
    () => localStorage.getItem("whenSleep") || "0"
  );

  const [clean, setClean] = useState(
    () => localStorage.getItem("clean") || "0"
  );

  const [alarm, setAlarm] = useState(
    () => localStorage.getItem("alarm") || "0"
  );

  const [bedTime, setBedTime] = useState(
    () => localStorage.getItem("bedTime") || "22:00"
  );

  const [wakeUpTime, setWakeUpTime] = useState(
    () => localStorage.getItem("wakeUpTime") || "07:00"
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

  const handlePrev = () => {
    if (currentStep >= 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    } else {
      alert(
        `성별: ${gender}, 나이: ${age}, 이름: ${name}, 선택한 개월: ${selectedMonth}`
      );
    }
  };

  const getMbtiFormat = () => {
    const mbti = localStorage.getItem("mbti");
    if (mbti) {
      const mbtiObj = JSON.parse(mbti);
      return `${mbtiObj.ie}${mbtiObj.sn}${mbtiObj.tf}${mbtiObj.jp}`;
    }
    return "";
  };

  const handleReset = () => {
    if (window.confirm("입력된 정보를 초기화할까요?")) {
      localStorage.clear();
      localStorage.setItem("selectedMonth", "4개월");
      localStorage.setItem("gender", "남자");
      localStorage.setItem("age", "95");
      localStorage.setItem("hakbun", "15");
      localStorage.setItem("wakeUpTime", "07:00");
      localStorage.setItem("bedTime", "22:00");
      localStorage.setItem("smokingStatus", "0");
      localStorage.setItem("whenSleep", "0");
      localStorage.setItem("clean", "0");
      localStorage.setItem("alarm", "0");
      localStorage.removeItem("name");

      setSelectedMonth("4개월");
      setGender("남자");
      setAge("95");
      setName("");
      setHakbun("15");
      setSmokingStatus("0");
      setWhenSleep("0");
      setClean("0");
      setAlarm("0");
      setWakeUpTime("07:00");
      setBedTime("22:00");
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
        <MbtiSelector />
        <div className="nextNprevButton">
          <div style={{ width: "40%" }}></div>
          <button className="Button" onClick={handleNext}>
            🔜
          </button>
        </div>
      </Div>
      <Div isVisible={currentStep === 1}>
        <h3>자기소개를 해주세요!</h3>
        <WakeUp />
        <div className="row">
          <SmokingStatus />
          <Clean />
        </div>
        <div className="row">
          <Alarm />
          <WhenSleep />
        </div>
        <div className="nextNprevButton">
          <button className="Button" onClick={handlePrev}>
            🔙
          </button>
          <button className="Button" onClick={handleNext}>
            🔜
          </button>
        </div>
      </Div>
      <Div isVisible={currentStep === 2}>
        <h3>제 룸메는 이랬으면 좋겠어요!</h3>

        <div className="nextNprevButton">
          <button onClick={handlePrev}>🔙</button>
          <button onClick={handleNext}>🔜</button>
        </div>
      </Div>
      <Div isVisible={currentStep === 3}>
        <h3>룸메님, 이건 지켜 주세요!</h3>
        <textarea
          placeholder="없다면 넘어가도 무방해요."
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <div className="nextNprevButton">
          <button onClick={handlePrev}>🔙</button>
          <button onClick={handleNext}>🔜</button>
        </div>
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
            <p>흡연 여부: {localStorage.smokingStatus}</p>
            <p>mbti: {getMbtiFormat()}</p>
            <p>선택한 개월: {localStorage.selectedMonth}</p>
            <p>
              {localStorage.bedTime}시에 자고, {localStorage.wakeUpTime}시에
              일어나요
            </p>
            <p
              dangerouslySetInnerHTML={{
                __html: localStorage.name ? "룸메님 이건 지켜주세요!" : "",
              }}
            ></p>
            <p
              dangerouslySetInnerHTML={{
                __html: localStorage.name
                  ? localStorage.name.replace(/&#10;/g, "<br />")
                  : "",
              }}
            ></p>
            <button onClick={handlePrev}>이전</button>
            <button onClick={handleSave}>저장하기</button>
            <button onClick={handleReset}>처음으로</button>
          </Div>
        )}
      </div>
    </Container>
  );
};

export default Input;
