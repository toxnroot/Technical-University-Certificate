"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchDashboard from "@/app/components/SearchDashboard/SearchDashboard";
import StudentTable from "@/app/components/StudentTable/StudentTable";
import { Dialog } from "@headlessui/react";

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({});
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await axios.get("/api/students");
        setStudents(response.data);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    }
    fetchStudents();
  }, []);

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const results = students.filter((student) =>
      Object.values(student).some((value) =>
        String(value).toLowerCase().includes(lowerCaseQuery)
      )
    );
    setSearchResults(results);
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
      
      // تحديث نتائج البحث المعروضة
      setSearchResults((prev) =>
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
  

  const openDeleteDialog = (id) => {
    setStudentToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setStudentToDelete(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/students/${studentToDelete}`);
      setStudents((prev) => prev.filter((student) => student.id !== studentToDelete));
      setSearchResults((prev) => prev.filter((student) => student.id !== studentToDelete));
      closeDeleteDialog();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto" dir="rtl">
      <SearchDashboard onSearch={handleSearch} />
      <StudentTable
        students={searchResults}
        onEdit={handleEdit}
        onDelete={openDeleteDialog}
        editingStudent={editingStudent}
        formData={formData}
        onChange={handleChange}
        onSave={handleSave}
        setEditingStudent={setEditingStudent}
      />

      {/* Dialog for Delete Confirmation */}
      <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold text-gray-800 mb-4">تأكيد الحذف</h2>
            <p className="text-gray-600 mb-6">هل أنت متأكد أنك تريد حذف هذا الطالب؟</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeDeleteDialog}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
              >
                إلغاء
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
