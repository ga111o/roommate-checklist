import React, { useState, useEffect } from "react";
import "./mbti.css";

const mbtiDescriptions = {
  INTJ: "상상력이 풍부하며 철두철미한 계획을 세우는 사람들",
  INTP: "혁신적이고 호기심이 많은 사색가들",
  ENTJ: "대담하고 상상력이 풍부한 리더",
  ENTP: "지적인 도전을 즐기는 영리한 사람들",
  INFJ: "조용하고 신비로우며 매우 통찰력 있는 사람들",
  INFP: "상상력이 풍부하고 이상주의적인 사람들",
  ENFJ: "카리스마 있고 영감을 주는 리더",
  ENFP: "열정적이고 창의적인 자유로운 영혼들",
  ISTJ: "책임감 있고 신뢰할 수 있는 사람들",
  ISFJ: "헌신적이고 따뜻한 보호자들",
  ESTJ: "관리 능력이 뛰어나고 리더십이 강한 사람들",
  ESFJ: "사교적이고 협력적인 사람들",
  ISTP: "대담하고 실용적인 실험가들",
  ISFP: "유연하고 매력적인 예술가들",
  ESTP: "에너지 넘치고 실용적인 사람들",
  ESFP: "자발적이고 열정적인 즐거움 추구자들",
};

const MbtiSelector = () => {
  const [mbti, setMbti] = useState({
    ie: "",
    sn: "",
    tf: "",
    jp: "",
  });

  useEffect(() => {
    const savedMbti = JSON.parse(localStorage.getItem("mbti"));
    if (savedMbti) {
      setMbti(savedMbti);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mbti", JSON.stringify(mbti));
  }, [mbti]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMbti((prevMbti) => ({
      ...prevMbti,
      [name]: value,
    }));
  };

  const { ie, sn, tf, jp } = mbti;
  const selectedMbti = ie + sn + tf + jp;
  const description = mbtiDescriptions[selectedMbti] || "";

  return (
    <div className="mbtiGroup">
      <div className="mbtiRow">
        <div className="myMbti">
          <p className="">{selectedMbti}</p>
        </div>

        <div className="radioGroup">
          <div className="smallMbtiGroup">
            <label>
              <input
                type="radio"
                name="ie"
                value="I"
                checked={ie === "I"}
                onChange={handleChange}
              />
              <span className="custom-radio"></span>I
            </label>
            <label>
              <input
                type="radio"
                name="ie"
                value="E"
                checked={ie === "E"}
                onChange={handleChange}
              />
              <span className="custom-radio"></span>E
            </label>
          </div>

          <div className="smallMbtiGroup">
            <label>
              <input
                type="radio"
                name="sn"
                value="S"
                checked={sn === "S"}
                onChange={handleChange}
              />
              <span className="custom-radio"></span>S
            </label>
            <label>
              <input
                type="radio"
                name="sn"
                value="N"
                checked={sn === "N"}
                onChange={handleChange}
              />
              <span className="custom-radio"></span>N
            </label>
          </div>

          <div className="smallMbtiGroup">
            <label>
              <input
                type="radio"
                name="tf"
                value="T"
                checked={tf === "T"}
                onChange={handleChange}
              />
              <span className="custom-radio"></span>T
            </label>
            <label>
              <input
                type="radio"
                name="tf"
                value="F"
                checked={tf === "F"}
                onChange={handleChange}
              />
              <span className="custom-radio"></span>F
            </label>
          </div>

          <div className="smallMbtiGroup">
            <label>
              <input
                type="radio"
                name="jp"
                value="J"
                checked={jp === "J"}
                onChange={handleChange}
              />
              <span className="custom-radio"></span>J
            </label>
            <label>
              <input
                type="radio"
                name="jp"
                value="P"
                checked={jp === "P"}
                onChange={handleChange}
              />
              <span className="custom-radio"></span>P
            </label>
          </div>
        </div>
      </div>

      <div className="mbtiDescription">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default MbtiSelector;
