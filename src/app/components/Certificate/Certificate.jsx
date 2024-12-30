"use client";

import styled from "styled-components";
import { QRCodeSVG } from "qrcode.react";

const Certificate = ({ student, fullUrl }) => {
  return (
    <StyleWrapper>
      <div className="canvas" id="student-details">
        <div className="header">
          <img src="/award.png" alt="award" />
          <h2>Certificate of Achievement</h2>
          <p>This certifies that</p>
        </div>
        <h1 className="student-name">{student.name}</h1>
        <p className="course-info">has successfully completed the course:</p>
        <h2 className="course-title">{student.course}</h2>
        <p className="instructor-info">Under the supervision of {student.instructor}</p>
        <p className="student-id">Student ID: {student.id}</p>
        <div className="footer">
          <QRCodeSVG value={fullUrl} size={100} className="qrcode" />
          <p>Scan to verify the certificate</p>
        </div>
      </div>
    </StyleWrapper>
  );
};

const StyleWrapper = styled.div`
  .canvas {
    width: 90vw; /* نسبة العرض */
    max-width: 800px; /* الحد الأقصى للعرض */
    aspect-ratio: 4 / 3; /* الحفاظ على نسبة العرض إلى الارتفاع */
    background: linear-gradient(135deg, #ffffff, #f9f9f9);
    border: 10px solid #1d3557;
    border-radius: 20px;
    padding: 20px;
    text-align: center;
    font-family: "Georgia", serif;
    color: #1d3557;
    margin: 20px auto;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  .header h2 {
    font-size: 2vw; /* قابل للتكيف */
    font-weight: bold;
    margin-bottom: 10px;
  }

  .header p {
    font-size: 1.2vw; /* قابل للتكيف */
    margin-bottom: 20px;
  }

  .student-name {
    font-size: 2.5vw; /* قابل للتكيف */
    font-weight: bold;
    margin: 10px 0;
    color: #457b9d;
  }

  .course-info,
  .instructor-info,
  .student-id {
    font-size: 1.2vw; /* قابل للتكيف */
    margin: 10px 0;
  }

  .course-title {
    font-size: 2vw; /* قابل للتكيف */
    font-weight: bold;
    margin: 20px 0;
    color: #e63946;
  }

  .footer {
    margin-top: 20px;
  }

  .qrcode {
    margin: 10px auto;
  }

  .footer p {
    font-size: 1vw; /* قابل للتكيف */
    color: #6c757d;
    margin-top: 10px;
  }

  @media (max-width: 768px) {
    .header h2,
    .student-name,
    .course-title {
      font-size: 4vw;
    }

    .header p,
    .course-info,
    .instructor-info,
    .student-id,
    .footer p {
      font-size: 3vw;
    }
  }
`;

export default Certificate;
