import React from "react";

interface Props {
  open: boolean;
  taskTitle?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteTodo({ open, taskTitle, onCancel, onConfirm }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Xác nhận xóa</h2>
        <p className="mb-6">
          Bạn có chắc muốn xóa công việc{" "}
          <span className="font-semibold text-red-600">{taskTitle}</span>?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
