import { useState } from 'react';
import * as XLSX from 'xlsx';
import { db, setDoc, doc, getDoc,serverTimestamp  } from '@/app/api/firebase'; // تأكد من استيراد Firestore
import { create } from 'qrcode';

const useExcelData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [studentsNot, setStudentsNot] = useState([]);

  const parseExcelFile = async (file) => {
    setLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(sheet);

        // تحديث الحالة بالبيانات النصية بدون صور
        setData(sheetData);
        
        
        // رفع البيانات إلى Firestore
        await addStudentsToFirestore(sheetData); // رفع البيانات
      };
      reader.onerror = (err) => {
        console.error("Error reading file:", err);
        setError('حدث خطأ أثناء قراءة الملف');
      };

      // قراءة الملف كـ ArrayBuffer
      reader.readAsArrayBuffer(file);
    } catch (err) {
      console.error("Error processing file:", err);
      setError('حدث خطأ أثناء معالجة الملف');
    } finally {
      setLoading(false);
    }
  };

  const addStudentsToFirestore = async (students) => {
    try {
      for (const student of students) {
        // التأكد من أن ID الطالب هو نص
        const studentRef = doc(db, "students", String(student.id)); // تحويل ID إلى نص
        const studentSnap = await getDoc(studentRef); // التحقق إذا كان الطالب موجوداً

        if (!studentSnap.exists()) {
          // إذا لم يكن الطالب موجودًا، قم بإضافته
          await setDoc(studentRef, {
            id: student.id,
            name: student.name,
            instructor: student.instructor,
            course: student.course,
            number: student.number,
            gender: student.gender,
            birthdate: student.birthdate,
            createdAt: serverTimestamp(),
          });
          console.log(`تم إضافة الطالب: ${student.name}`);
          setStudents((prevStudents) => [...prevStudents, student]);
        } else {
          console.log(`الطالب ${student.name} موجود بالفعل`);
          setStudentsNot((prevStudents) => [...prevStudents, student]);
        }
      }
      console.log('تم معالجة البيانات بنجاح!');
    } catch (error) {
      console.error('حدث خطأ أثناء رفع البيانات إلى Firestore:', error);
      setError('حدث خطأ أثناء رفع البيانات إلى Firestore');
    }
  };

  return { data, parseExcelFile, loading, error , students , studentsNot};
};

export default useExcelData;
