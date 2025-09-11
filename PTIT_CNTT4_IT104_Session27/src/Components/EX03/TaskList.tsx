import React from "react";
import { Link } from "react-router-dom";

type Task = {
  id: number;
  title: string;
  description: string;
};

const tasks: Task[] = [
  { id: 1, title: "Học React", description: "Ôn tập cơ bản ReactJS" },
  { id: 2, title: "Học Router", description: "Hiểu cách routing trong React" },
  { id: 3, title: "Học TypeScript", description: "Typing an toàn hơn" },
];

export default function TaskList() {
  return (
    <div className="text-center ">
      <h1 className="font-bold">Danh sách công việc</h1>
      <ul className="flex flex-col content-center">
        {tasks.map((task) => (
          <li className="border w-[250px] h-[100px]" key={task.id}>
            <Link to={`/task/${task.id}`}>
              <b>{task.title}</b> - {task.description}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
