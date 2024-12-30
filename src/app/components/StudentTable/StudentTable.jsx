import { Pencil, LucideTrash2 , Eye,GraduationCap } from "lucide-react";
function StudentTable({
  students,
  onEdit,
  onDelete,
  editingStudent,
  formData,
  onChange,
  onSave,
  setEditingStudent,
}) {
  return (
    <div className="bg-slate-950 rounded-lg shadow-lg overflow-hidden mt-4">

      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-300">ID</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-300">Name</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-300">Study Section</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-300">Birt of Date</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-300 flex justify-center itmes-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-900">
                <td className="px-6 py-4 text-sm text-gray-400">{student.id}</td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {editingStudent === student.id ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ""}
                      onChange={onChange}
                      className="border rounded px-2 py-1 w-full bg-slate-800"
                    />
                  ) : (
                    student.name
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">
                  {editingStudent === student.id ? (
                    <input
                      type="text"
                      name="course"
                      value={formData.course || ""}
                      onChange={onChange}
                      className="border rounded px-2 py-1 w-full bg-slate-800"
                    />
                  ) : (
                    student.course
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">
                  {editingStudent === student.id ? (
                    <input
                      type="date"
                      name="birthdate"
                      value={formData.birthdate || ""}
                      onChange={onChange}
                      className="border rounded px-2 py-1 w-full bg-slate-800"
                    />
                  ) : (
                    student.birthdate
                  )}
                </td>
                <td className="px-6 py-4 text-sm flex justify-center items-center">
                  {editingStudent === student.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={onSave}
                        className="text-green-600 hover:text-green-800"
                      >
                        حفظ
                      </button>
                      <button
                        onClick={() => setEditingStudent(null)}
                        className="text-red-600 hover:text-red-800"
                      >
                        إلغاء
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(student)}
                        className="text-white hover:bg-white bg-blue-800 hover:text-blue-800 rounded px-1 flex justify-center items-center items-center gap-1" 
                      >
                        <Pencil size={15} />
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(student.id)}
                        className="text-white hover:bg-white bg-red-800 hover:text-red-800 rounded px-1 flex justify-center items-center items-center gap-1"
                      >
                        <LucideTrash2 size={15} />
                        Delete
                      </button>
                      {/* إضافة زر الشهادة */}
                      <a
                        href={`/certificate/${student.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:bg-white bg-green-800 hover:text-green-800 rounded px-1 flex justify-center items-center items-center gap-1"
                      >
                        <GraduationCap size={15} />
                        Certificate
                      </a>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentTable;
