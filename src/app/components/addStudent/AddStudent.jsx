"use client";
import { useState } from "react";
import styled from "styled-components";
import { db,doc, setDoc, serverTimestamp } from "@/app/api/firebase";


const AddStudent = ({ onclose }) => {
  const [studentData, setStudentData] = useState({
    name: "",
    cardId: "",
    course: "",
    instructor: "",
    birthdate: "",
    gender: "Male",
    number: "",
    createdAt: serverTimestamp(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { cardId, ...dataWithoutId } = studentData; // فصل cardId لاستخدامه كـ ID
    try {
      if (!cardId) {
        alert("Please enter a valid Card ID.");
        return;
      }
      // إنشاء مستند بالـ ID الخاص
      await setDoc(doc(db, "students", cardId), dataWithoutId);
      console.log("Student added successfully!");
      alert("Student added successfully!");
      onclose(); // إغلاق الـ dialog
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Failed to add student.");
    }
  };

  return (
    <StyledWrapper>
      <div className="container-form">
        <h1 className="title-form">Add New Student</h1>
        <button className="buttonC" onClick={onclose}>
          <span className="X" />
          <span className="Y" />
          <div className="close">Close</div>
        </button>
        <div className="group">
          <input
            name="name"
            value={studentData.name}
            onChange={handleChange}
            required
            type="text"
            className="input"
          />
          <span className="highlight" />
          <span className="bar" />
          <label>Name</label>
        </div>
        <div className="group">
          <input
            name="cardId"
            value={studentData.cardId}
            onChange={handleChange}
            required
            type="text"
            className="input"
          />
          <span className="highlight" />
          <span className="bar" />
          <label>Card Id</label>
        </div>
        <div className="group">
          <input
            name="course"
            value={studentData.course}
            onChange={handleChange}
            required
            type="text"
            className="input"
          />
          <span className="highlight" />
          <span className="bar" />
          <label>Course</label>
        </div>
        <div className="group">
          <input
            name="instructor"
            value={studentData.instructor}
            onChange={handleChange}
            required
            type="text"
            className="input"
          />
          <span className="highlight" />
          <span className="bar" />
          <label>Instructor</label>
        </div>
        <div className="group">
          <input
            name="birthdate"
            value={studentData.birthdate}
            onChange={handleChange}
            required
            type="text"
            className="input"
          />
          <span className="highlight" />
          <span className="bar" />
          <label>Birthdate</label>
        </div>
        <div className="group">
          <input
            name="number"
            value={studentData.number}
            onChange={handleChange}
            required
            type="text"
            className="input"
          />
          <span className="highlight" />
          <span className="bar" />
          <label>Number</label>
        </div>

        <div className="wrapper">
  <div className="option">
    <input
      className="input2"
      type="radio"
      name="gender"
      value="Male"
      checked={studentData.gender === "Male"}
      onChange={handleChange}
    />
    <div className="btn">
      <span className="span">Male</span>
    </div>
  </div>
  <div className="option">
    <input
      className="input2"
      type="radio"
      name="gender"
      value="Female"
      checked={studentData.gender === "Female"}
      onChange={handleChange}
    />
    <div className="btn">
      <span className="span">Female</span>
    </div>
  </div>
</div>
        <button className="button" onClick={handleSubmit}>
          <span className="circle1" />
          <span className="circle2" />
          <span className="circle3" />
          <span className="circle4" />
          <span className="circle5" />
          <span className="text">Submit</span>
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .group {
    position: relative;
  }

  .input {
    font-size: 16px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 300px;
    border: none;
    border-bottom: 1px solid #515151;
    background: transparent;
  }

  .input:focus {
    outline: none;
  }

  label {
    color: #999;
    font-size: 18px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }

  .input:focus ~ label,
  .input:valid ~ label {
    top: -20px;
    font-size: 14px;
    color: #307750;
  }

  .bar {
    position: relative;
    display: block;
    width: 300px;
  }

  .bar:before,
  .bar:after {
    content: "";
    height: 2px;
    width: 0;
    bottom: 1px;
    position: absolute;
    background: #307750;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }

  .bar:before {
    left: 50%;
  }

  .bar:after {
    right: 50%;
  }

  .input:focus ~ .bar:before,
  .input:focus ~ .bar:after {
    width: 50%;
  }

  .highlight {
    position: absolute;
    height: 60%;
    width: 100px;
    top: 25%;
    left: 0;
    pointer-events: none;
    opacity: 0.5;
  }

  .input:focus ~ .highlight {
    animation: inputHighlighter 0.3s ease;
  }

  @keyframes inputHighlighter {
    from {
      background: #307750;
    }

    to {
      width: 0;
      background: transparent;
    }
  }
  .container-form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 15px;
    padding: 10px;
    background: #151515;
    border-radius: 15px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
    .title-form {
      color: #fff;
      font-size: 1.5rem;
    }
  }

  .buttonC {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 35px;
    right: 30px;
    border: none;
    background: rgba(180, 83, 107, 0.11);
    border-radius: 50px;
    transition: background 0.5s;
  }

  .X {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 1.5px;
    background-color: rgb(255, 255, 255);
    transform: translateX(-50%) rotate(45deg);
  }

  .Y {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 1.5px;
    background-color: #fff;
    transform: translateX(-50%) rotate(-45deg);
  }

  .close {
    position: absolute;
    display: flex;
    padding: 0.8rem 1.5rem;
    align-items: center;
    justify-content: center;
    transform: translateX(-50%);
    top: -40px;
    left: 50%;
    width: 3em;
    height: 1.7em;
    font-size: 12px;
    background-color: rgb(19, 22, 24);
    color: rgb(187, 229, 236);
    border: none;
    border-radius: 3px;
    pointer-events: none;
    opacity: 0;
  }

  .buttonC:hover {
    background-color: rgb(211, 21, 21);
  }

  .buttonC:active {
    background-color: rgb(130, 0, 0);
  }

  .buttonC:hover > .close {
    animation: close 0.2s forwards 0.25s;
  }

  @keyframes close {
    100% {
      opacity: 1;
    }
  }

  .wrapper {
    --font-color-dark: #323232;
    --font-color-light: #fff;
    --bg-color: #fff;
    --main-color: #323232;
    position: relative;
    width: 168px;
    height: 36px;
    background-color: var(--bg-color);
    border: 2px solid var(--main-color);
    border-radius: 34px;
    display: flex;
    flex-direction: row;
    box-shadow: 4px 4px var(--main-color);
  }

  .option {
    width: 80.5px;
    height: 28px;
    position: relative;
    top: 2px;
    left: 2px;
  }

  .input2 {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    appearance: none;
    cursor: pointer;
  }

  .btn {
    width: 100%;
    height: 100%;
    background-color: var(--bg-color);
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .span {
    color: var(--font-color-dark);
  }

  .input2:checked + .btn {
    background-color: var(--main-color);
  }

  .input2:checked + .btn .span {
    color: var(--font-color-light);
  }
  .button {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    color: white;
    background-color: #323232;
    padding: 1em 2em;
    border: none;
    border-radius: 0.6rem;
    position: relative;
    cursor: pointer;
    overflow: hidden;
  }

  .button span:not(:nth-child(6)) {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 30px;
    width: 30px;
    background-color: #f0f0f0;
    border-radius: 50%;
    transition: 0.6s ease;
  }

  .button span:nth-child(6) {
    position: relative;
  }

  .button span:nth-child(1) {
    transform: translate(-3.3em, -4em);
  }

  .button span:nth-child(2) {
    transform: translate(-6em, 1.3em);
  }

  .button span:nth-child(3) {
    transform: translate(-0.2em, 1.8em);
  }

  .button span:nth-child(4) {
    transform: translate(3.5em, 1.4em);
  }

  .button span:nth-child(5) {
    transform: translate(3.5em, -3.8em);
  }

  .button:hover span:not(:nth-child(6)) {
    transform: translate(-50%, -50%) scale(4);
    transition: 1.5s ease;
  }
  .button:hover {
    color: #151515;
  }
`;

export default AddStudent;
