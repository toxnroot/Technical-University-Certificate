"use client";
import { useState } from 'react';
import useExcelData from '../../hooks/useExcelData';
import AddStudent from '../addStudent/AddStudent';
import './UploadFile.css';

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // حالة التحكم في ظهور النافذة
  const { data, parseExcelFile, loading, error, students, studentsNot } = useExcelData();

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      parseExcelFile(selectedFile);
    }
  };

  return (
    <>
      <div className="container">
        <div className="buttons">
          <button
            className="container-btn-file"
            onClick={() => setIsDialogOpen(true)} // عند الضغط، افتح النافذة
          >
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 64.000000 64.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                fill="#ffffff"
                stroke="none"
              >
                <path d="M184 480 c-80 -33 -139 -64 -139 -71 0 -8 59 -38 138 -72 l137 -58 98 42 c53 22 103 43 110 46 14 6 18 -117 3 -132 -5 -6 -12 -37 -16 -70 l-6 -61 41 4 c33 3 40 7 35 21 -12 31 -25 126 -25 188 0 53 3 64 21 73 31 17 20 29 -56 62 -39 16 -100 42 -136 58 l-66 28 -139 -58z" />
                <path d="M150 277 c0 -63 13 -79 84 -103 62 -21 156 -14 214 15 l42 21 0 60 0 59 -85 -36 -84 -36 -53 23 c-29 13 -68 29 -85 37 l-33 13 0 -53z" />
              </g>
            </svg>
            Add Student
          </button>
          <input hidden id="filexls" type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
          <label htmlFor="filexls">
            <div className="container-btn-file">
            <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50"><path d="M28.8125 .03125L.8125 5.34375C.339844 5.433594 0 5.863281 0 6.34375L0 43.65625C0 44.136719 .339844 44.566406 .8125 44.65625L28.8125 49.96875C28.875 49.980469 28.9375 50 29 50C29.230469 50 29.445313 49.929688 29.625 49.78125C29.855469 49.589844 30 49.296875 30 49L30 1C30 .703125 29.855469 .410156 29.625 .21875C29.394531 .0273438 29.105469 -.0234375 28.8125 .03125ZM32 6L32 13L34 13L34 15L32 15L32 20L34 20L34 22L32 22L32 27L34 27L34 29L32 29L32 35L34 35L34 37L32 37L32 44L47 44C48.101563 44 49 43.101563 49 42L49 8C49 6.898438 48.101563 6 47 6ZM36 13L44 13L44 15L36 15ZM6.6875 15.6875L11.8125 15.6875L14.5 21.28125C14.710938 21.722656 14.898438 22.265625 15.0625 22.875L15.09375 22.875C15.199219 22.511719 15.402344 21.941406 15.6875 21.21875L18.65625 15.6875L23.34375 15.6875L17.75 24.9375L23.5 34.375L18.53125 34.375L15.28125 28.28125C15.160156 28.054688 15.035156 27.636719 14.90625 27.03125L14.875 27.03125C14.8125 27.316406 14.664063 27.761719 14.4375 28.34375L11.1875 34.375L6.1875 34.375L12.15625 25.03125ZM36 20L44 20L44 22L36 22ZM36 27L44 27L44 29L36 29ZM36 35L44 35L44 37L36 37Z"/></svg>
              Upload File
            </div>
          </label>
        </div>

        {isDialogOpen && <AddStudent onclose={handleCloseDialog} />}

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="students-show">
          <span className="title">Data students On Upload</span>
          {students && students.length > 0 ? (
            <>
              <h1 className="title-1">Students who have been added</h1>
              <table>
                <thead>
                  <tr className='student-row'>
                    <th>Name</th>
                    <th>Instructor</th>
                    <th>Course</th>
                    <th>Number Course</th>
                    <th>ID</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.instructor}</td>
                      <td>{student.course}</td>
                      <td>{student.number}</td>
                      <td>{student.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : null}

          {studentsNot && studentsNot.length > 0 ? (
            <>
              <h1 className="title-2">Students already exist</h1>
              <table>
                <thead>
                  <tr className='student-not-row'>
                    <th>Name</th>
                    <th>Instructor</th>
                    <th>Course</th>
                    <th>Number Course</th>
                    <th>ID</th>
                  </tr>
                </thead>
                <tbody>
                  {studentsNot.map((student) => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.instructor}</td>
                      <td>{student.course}</td>
                      <td>{student.number}</td>
                      <td>{student.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default UploadFile;
