import { useSelector } from "react-redux";

export default function ListUser() {
  const users = useSelector((state: any) => state.listuser);

  return (
    <div className="p-6 bg-gray-50 rounded-xl">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
        Danh sách người dùng
      </h1>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full border-collapse bg-white text-sm text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Tên</th>
              <th className="px-4 py-3">Giới tính</th>
              <th className="px-4 py-3">Ngày sinh</th>
              <th className="px-4 py-3">Địa chỉ</th>
              <th className="px-4 py-3">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item: any) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-100 transition-colors"
              >
                <td className="px-4 py-3">{item.id}</td>
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.gender}</td>
                <td className="px-4 py-3">{item.birth}</td>
                <td className="px-4 py-3">{item.address}</td>
                <td className="px-4 py-3 space-x-2">
                  <button className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600">
                    Sửa
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
