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

const TermSelect = () => {
  const [selectedMonth, setSelectedMonth] = useState(
    localStorage.getItem("selectedMonth") || "12개월"
  );

  useEffect(() => {
    localStorage.setItem("selectedMonth", selectedMonth);
  }, [selectedMonth]);

  return (
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
  );
};

export default TermSelect;
