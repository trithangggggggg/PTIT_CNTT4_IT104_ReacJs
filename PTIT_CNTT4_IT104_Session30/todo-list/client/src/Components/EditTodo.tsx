import React, { useState, useEffect } from "react";

interface Props {
  open: boolean;
  taskTitle?: string;
  onCancel: () => void;
  onConfirm: (newTitle: string) => void;
  existingTitles: string[];
}

export default function EditTodo({ open, taskTitle, onCancel, onConfirm, existingTitles }: Props) {
  const [newTitle, setNewTitle] = useState(taskTitle || "");
  const [error, setError] = useState("");

  useEffect(() => {
    setNewTitle(taskTitle || "");
    setError("");
  }, [taskTitle, open]);

  if (!open) return null;

  function handleSave() {
    const trimmed = newTitle.trim();
    if (!trimmed) {
      setError("Tên công việc không được để trống.");
      return;
    }
    if (existingTitles.includes(trimmed) && trimmed !== taskTitle) {
      setError("Công việc này đã tồn tại.");
      return;
    }
    onConfirm(trimmed);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Chỉnh sửa công việc</h2>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
