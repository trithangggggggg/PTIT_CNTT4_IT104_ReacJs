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

export default function GetStudentById() {
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState<string>("");

  async function getStudentById(id: number) {
    try {
      const response = await axios.get<Student>(`http://localhost:8080/student/${id}`);
      if (response.data) {
        setStudent(response.data);
      } else {
        setError("Không tìm thấy bản ghi");
      }
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("Không tìm thấy bản ghi");
      } else {
        setError("Lỗi khi gọi API");
      }
    }
  }

  useEffect(() => {
    getStudentById(2);
  }, []);

  return (
    <div>
      <h1>Chi tiết sinh viên</h1>
      {error && <p className="text-red-600">{error}</p>}
      {student && (
        <div>
          <p>Tên: {student.student_name}</p>
          <p>Email: {student.email}</p>
          <p>Địa chỉ: {student.address}</p>
          <p>Điện thoại: {student.phone}</p>
          <p>Trạng thái: {student.status ? "Đang học" : "Đã nghỉ"}</p>
          <p>Ngày thêm: {student.created_at}</p>
        </div>
      )}
    </div>
  );
}
