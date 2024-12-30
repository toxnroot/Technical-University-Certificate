import { Dialog } from "@headlessui/react";

export default function DeleteDialog({ isOpen, onClose, onDelete }) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <h2 className="text-xl font-bold text-gray-800 mb-4">تأكيد الحذف</h2>
          <p className="text-gray-600 mb-6">هل أنت متأكد أنك تريد حذف هذا الطالب؟</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
            >
              إلغاء
            </button>
            <button
              onClick={onDelete}
              className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
            >
              حذف
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
