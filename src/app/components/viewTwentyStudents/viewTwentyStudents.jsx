"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; 
import StudentTable from "@/app/components/StudentTable/StudentTable"; // استيراد مكون StudentTable
import "./ViewTwentyStudents.css";

const ViewTwentyStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${window.location.origin}/api/students`);
        const data = response.data;

        // فرز الطلاب بناءً على createdAt
        const sortedStudents = data.sort(
          (a, b) => b.createdAt.seconds - a.createdAt.seconds
        );

        // أخذ أول 20 طالبًا
        const recentStudents = sortedStudents.slice(0, 20);
        setStudents(recentStudents);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleViewAll = () => {
    router.push("/dashboard/students");
  };

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const results = students.filter((student) =>
      Object.values(student).some((value) =>
        String(value).toLowerCase().includes(lowerCaseQuery)
      )
    );
    setStudents(results);
  };

  const handleEdit = (student) => {
    setEditingStudent(student.id);
    setFormData(student);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/students/${editingStudent}`, formData);
      
      // تحديث قائمة الطلاب بعد التعديل
      setStudents((prev) =>
        prev.map((student) =>
          student.id === editingStudent ? { ...student, ...formData } : student
        )
      );
      
      // إعادة ضبط حالات التعديل
      setEditingStudent(null);
      setFormData({});
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/students/${id}`);
      setStudents((prev) => prev.filter((student) => student.id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="view-twenty-students">
      <div className="header">
        <h1>Recent 20 Students</h1>
        <button className="container-btn-file" onClick={handleViewAll}>
          View All Students
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && students.length > 0 && (
        <StudentTable
          students={students}
          onEdit={handleEdit}
          onDelete={handleDelete}
          editingStudent={editingStudent}
          formData={formData}
          onChange={handleChange}
          onSave={handleSave}
          setEditingStudent={setEditingStudent}
        />
      )}

      {!loading && !error && students.length === 0 && (
        <p>No students found.</p>
      )}
    </div>
  );
};

export default ViewTwentyStudents;
