import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import DeleteTodo from "./DeleteTodo";
import EditTodo from "./EditTodo";
import Loading from "./Loading";

interface Task {
  id: number;
  title: string;
  status: boolean;
}

export default function AppTodo() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [adding, setAdding] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [openEdit, setOpenEdit] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [filter, setFilter] = useState<"all" | "completed" | "active">("all");

  async function getAllTask() {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Lỗi API:", err);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  }

  useEffect(() => {
    getAllTask();
  }, []);

  async function handleAddTask(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setErrorTitle("Tên công việc không được để trống.");
      return;
    }
    try {
      setAdding(true);
      await axios.post("http://localhost:8080/tasks", {
        title: trimmed,
        status: false,
      });
      setTitle("");
      await getAllTask();
    } catch (err) {
      console.error("Thêm thất bại:", err);
    } finally {
      setAdding(false);
    }
  }

  async function handleToggleStatus(task: Task) {
    try {
      const nextStatus = !task.status;
      await axios.patch(`http://localhost:8080/tasks/${task.id}`, {
        status: nextStatus,
      });
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, status: nextStatus } : t))
      );
    } catch (err) {
      console.error("Toggle thất bại:", err);
    }
  }

  function handleAskDelete(task: Task) {
    setSelectedTask(task);
    setOpenConfirm(true);
  }
  function handleCancelDelete() {
    setOpenConfirm(false);
    setSelectedTask(null);
  }
  async function handleConfirmDelete() {
    if (!selectedTask) return;
    try {
      await axios.delete(`http://localhost:8080/tasks/${selectedTask.id}`);
      await getAllTask();
    } catch (err) {
      console.error("Xóa thất bại:", err);
    } finally {
      setOpenConfirm(false);
      setSelectedTask(null);
    }
  }

  function handleAskEdit(task: Task) {
    setEditingTask(task);
    setOpenEdit(true);
  }
  function handleCancelEdit() {
    setOpenEdit(false);
    setEditingTask(null);
  }
  async function handleConfirmEdit(newTitle: string) {
    if (!editingTask) return;
    try {
      await axios.patch(`http://localhost:8080/tasks/${editingTask.id}`, {
        title: newTitle,
      });
      await getAllTask();
    } catch (err) {
      console.error("Cập nhật thất bại:", err);
    } finally {
      setOpenEdit(false);
      setEditingTask(null);
    }
  }
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.status === true;
    if (filter === "active") return task.status === false;
    return true; // all
  });

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-6">
      <div className="w-full max-w-lg">
        <h1 className="font-bold text-2xl text-center mb-6">
          Quản lý công việc
        </h1>

        <form
          onSubmit={handleAddTask}
          className="bg-white p-5 rounded-xl shadow mb-6"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errorTitle) setErrorTitle("");
            }}
            placeholder="Nhập tên công việc"
            className={`w-full border rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 ${
              errorTitle
                ? "border-red-400 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errorTitle && (
            <p className="text-red-500 text-sm mb-2">{errorTitle}</p>
          )}
          <button
            type="submit"
            disabled={adding}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold shadow disabled:opacity-60"
          >
            {adding ? "Đang thêm..." : "Thêm công việc"}
          </button>
        </form>

        <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-3 justify-center">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg shadow ${
              filter === "all" ? "bg-blue-600 text-white" : "border"
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded-lg shadow ${
              filter === "completed" ? "bg-blue-600 text-white" : "border"
            }`}
          >
            Hoàn thành
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-4 py-2 rounded-lg shadow ${
              filter === "active" ? "bg-blue-600 text-white" : "border"
            }`}
          >
            Đang thực hiện
          </button>
        </div>

        <h4>Danh sách công việc</h4>
        <div className="bg-white p-4 rounded-xl shadow mb-6 space-y-3">
          {loading ? (
            <Loading />
          ) : filteredTasks.length === 0 ? (
            <p className="text-gray-500">Chưa có công việc nào.</p>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.status}
                    onChange={() => handleToggleStatus(task)}
                    className="w-4 h-4"
                  />
                  <span
                    className={task.status ? "line-through text-gray-400" : ""}
                  >
                    {task.title}
                  </span>
                </label>
                <div className="flex gap-3 text-gray-600">
                  <button
                    onClick={() => handleAskEdit(task)}
                    className="text-yellow-500 hover:text-yellow-600"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleAskDelete(task)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex gap-4 justify-center">
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow">
            Xóa công việc hoàn thành
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow">
            Xóa tất cả công việc
          </button>
        </div>
      </div>

      <DeleteTodo
        open={openConfirm}
        taskTitle={selectedTask?.title}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
      <EditTodo
        open={openEdit}
        taskTitle={editingTask?.title}
        onCancel={handleCancelEdit}
        onConfirm={handleConfirmEdit}
        existingTitles={tasks.map((t) => t.title)}
      />
    </div>
  );
}
