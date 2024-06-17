import React, { useState, useEffect } from "react";
import styled from "styled-components";

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

const GenderSelect = () => {
  const [gender, setGender] = useState(
    localStorage.getItem("gender") || "남자"
  );

  useEffect(() => {
    if (gender) {
      localStorage.setItem("gender", gender);
    }
  }, [gender]);

  return (
    <div className="innerDetailsInput">
      <Button isSelected={gender === "남자"} onClick={() => setGender("남자")}>
        👨남자
      </Button>
      <Button isSelected={gender === "여자"} onClick={() => setGender("여자")}>
        👧여자
      </Button>
    </div>
  );
};

export default GenderSelect;
