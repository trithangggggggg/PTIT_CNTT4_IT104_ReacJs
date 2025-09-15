import { useEffect, useState } from "react";
import axios from "axios";

type Student = {
  id: number;
  student_name: string;
  email: string;
  address: string;
  phone: string;
  status: boolean;
  created_at: string;
};

export default function CreateStudent() {
  const [createdStudent, setCreatedStudent] = useState<Student | null>(null);

  async function createStudent() {
    const newStudent: Student = {
      id: 6,
      student_name: "Student 6",
      email: "student6@gmail.com",
      address: "Ha Noi",
      phone: "0123456789",
      status: true,
      created_at: "2025-02-02"
    };

    try {
      const response = await axios.post<Student>(
        "http://localhost:8080/student",
        newStudent
      );
      setCreatedStudent(response.data);
    } catch (error) {
      console.error("Lỗi khi thêm mới:", error);
    }
  }

  useEffect(() => {
    createStudent();
  }, []);

  return (
    <div>
      <h1>Tạo mới sinh viên</h1>
      {createdStudent && (
        <div>
          <p>Thêm thành công: {createdStudent.student_name}</p>
          <p>Email: {createdStudent.email}</p>
        </div>
      )}
    </div>
  );
}
