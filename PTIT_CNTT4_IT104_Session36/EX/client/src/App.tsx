import React, { useState, useMemo, useEffect, useRef } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store/stores";
import type { Priority, Task } from "./types/listType";
import Loading from "./components/Loading";
import { fetchTasks, addTask, deleteTask, updateTask } from "./store/taskSlice";

const App: React.FC = () => {
  const { items: tasks, loading } = useSelector(
    (state: RootState) => state.task
  );

  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>("Cao");
  const [taskUpdate, setTaskUpdate] = useState<Task | null>(null);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const [filters, setFilters] = useState({
    status: "Tất cả",
    priority: "Tất cả",
    searchTerm: "",
  });

  useEffect(() => {
    dispatch(fetchTasks() as any);
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTaskText.trim()) {
      alert("Tên công việc không được để trống");
      return;
    }
    if (
      tasks.some(
        (t) =>
          t.taskName.toLowerCase() === newTaskText.trim().toLowerCase() &&
          t.id !== taskUpdate?.id
      )
    ) {
      alert("Tên công việc đã tồn tại");
      return;
    }
    if (!newTaskPriority) {
      alert("Vui lòng chọn độ ưu tiên");
      return;
    }

    if (taskUpdate) {
      dispatch(
        updateTask({
          ...taskUpdate,
          taskName: newTaskText,
          priority: newTaskPriority,
        }) as any
      );
    } else {
      dispatch(
        addTask({
          taskName: newTaskText.trim(),
          priority: newTaskPriority,
          completed: false,
        }) as any
      );
    }

    setNewTaskText("");
    setNewTaskPriority("Cao");
    setTaskUpdate(null);
    inputRef.current?.focus();
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const statusMatch =
        filters.status === "Tất cả" ||
        (filters.status === "Hoàn thành" && task.completed) ||
        (filters.status === "Chưa hoàn thành" && !task.completed);

      const priorityMatch =
        filters.priority === "Tất cả" || task.priority === filters.priority;

      const searchTermMatch = task.taskName
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());

      return statusMatch && priorityMatch && searchTermMatch;
    });
  }, [tasks, filters]);

  const handleDelete = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa công việc này không?")) {
      dispatch(deleteTask(id) as any);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="task-manager-container">
      <h1>Task Manager</h1>

      <form className="card add-task-form" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Công việc mới"
          className="task-input"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <select
          className="priority-select"
          value={newTaskPriority}
          onChange={(e) => setNewTaskPriority(e.target.value as Priority)}
        >
          <option value="Cao">Cao</option>
          <option value="Trung bình">Trung bình</option>
          <option value="Thấp">Thấp</option>
        </select>
        <button type="submit" className="add-button">
          {taskUpdate ? "Cập Nhật" : "Thêm"}
        </button>
        {taskUpdate && (
          <button
            type="button"
            style={{ backgroundColor: "red" }}
            onClick={() => {
              setTaskUpdate(null);
              setNewTaskText("");
              setNewTaskPriority("Cao");
            }}
          >
            Hủy Cập Nhật
          </button>
        )}
      </form>

      <div className="card filter-controls">
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option>Tất cả</option>
          <option>Hoàn thành</option>
          <option>Chưa hoàn thành</option>
        </select>
        <select
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
        >
          <option>Tất cả</option>
          <option>Cao</option>
          <option>Trung bình</option>
          <option>Thấp</option>
        </select>
        <input
          type="text"
          placeholder="Tìm kiếm"
          value={filters.searchTerm}
          onChange={(e) =>
            setFilters({ ...filters, searchTerm: e.target.value })
          }
        />
      </div>

      <div className="task-list">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`card task-item ${task.completed ? "completed" : ""}`}
          >
            <input type="checkbox" checked={task.completed} readOnly />
            <p className="task-text">{task.taskName}</p>
            <span
              className={`badge badge-${task.priority
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              {task.priority.toUpperCase()}
            </span>
            <button
              className="icon-button"
              onClick={() => handleDelete(task.id)}
            >
              🗑️
            </button>
            <button
              className="icon-button"
              onClick={() => {
                setTaskUpdate(task);
                setNewTaskText(task.taskName);
                setNewTaskPriority(task.priority);
              }}
            >
              ✏️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
