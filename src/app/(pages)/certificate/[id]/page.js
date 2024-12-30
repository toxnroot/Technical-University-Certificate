"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import Certificate from "@/app/components/Certificate/Certificate";
import "./page.css";
import ButtonDownload from "@/app/components/ButtonDownload/ButtonDownload";
const Page = () => {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const [fullUrl, setFullUrl] = useState("");
  const params = useParams();
  const pathname = usePathname();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`/api/students/${params.id}`);
        if (!response.ok) {
          throw new Error("Student not found");
        }
        const data = await response.json();
        setStudent(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchStudentData();
  }, [params]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(
        `${window.location.protocol}//${window.location.host}${pathname}`
      );
    }
  }, [pathname]);

  const handleDownloadImage = () => {
    const element = document.getElementById("student-details");
    toPng(element, {
      quality: 2,
      width: 1024, // عرض ثابت عند التحميل
      height: 688, // ارتفاع ثابت عند التحميل
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `certificate_${student.name}.png`;
        link.click();
      })
      .catch((error) => {
        console.error("An error occurred while capturing the image", error);
      });
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById("student-details");
    toPng(element, {
      quality: 2,
      width: 1024, // عرض ثابت عند التحميل
      height: 688, // ارتفاع ثابت عند التحميل
    })
      .then((dataUrl) => {
        const pdf = new jsPDF("landscape", "px", [1024, 768]);
        pdf.addImage(dataUrl, "PNG", 0, 0, 1024, 768);
        pdf.save(`certificate_${student.name}.pdf`);
      })
      .catch((error) => {
        console.error("An error occurred while generating the PDF", error);
      });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!student) {
    return (
      <div className="container w-full flex flex-col justify-center items-center">
        <div className="loader">
          <div className="load-inner load-one" />
          <div className="load-inner load-two" />
          <div className="load-inner load-three" />
          <span className="text">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container p-6 w-full flex flex-col justify-center items-center">
      <Certificate student={student} fullUrl={fullUrl} />
      <div className="buttons mt-4 flex gap-4">
        <ButtonDownload download={handleDownloadImage} text="Download as Image" color="bg-blue-500"/>
        <ButtonDownload download={handleDownloadPDF} text="Download as PDF" color="bg-red-500"/>
      </div>
    </div>
  );
};

export default Page;
