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

export default function GetAllStudent() {
  const [students, setStudents] = useState<Student[]>([]);

  const getAllStudent = async () => {
    try {
      const res = await axios.get("http://localhost:8080/student");
      setStudents(res.data);
    } catch (error) {
      console.error("Loi khi lay danh sach:", error);
    }
  };

  useEffect(() => {
    getAllStudent();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/student/${id}`);
      getAllStudent();
    } catch (error) {
      console.error("Loi khi xoa:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Danh sach hoc sinh</h1>
      <div className="grid grid-cols-3 gap-4">
        {students.map((st) => (
          <div key={st.id} className="border p-3 rounded shadow">
            <h3 className="font-semibold">{st.student_name}</h3>
            <p>Email: {st.email}</p>
            <p>Dia chi: {st.address}</p>
            <p>Phone: {st.phone}</p>
            <p>Trang thai: {st.status ? "Dang hoc" : "Da nghi"}</p>
            <p>Ngay them: {st.created_at}</p>
            <button
              onClick={() => handleDelete(st.id)}
              className="mt-2 text-red-600 hover:underline"
            >
              🗑 Xoa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
