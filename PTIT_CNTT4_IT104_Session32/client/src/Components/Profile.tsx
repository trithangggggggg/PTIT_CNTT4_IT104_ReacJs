import { useSelector } from "react-redux";

export default function Profile() {
  const profile = useSelector((state: any) => {
    console.log(state);
    return state.profile;
  });

  return (
    <div>
      <h1>Thông tin cá nhân</h1>
      <p>ID: {profile.id}</p>
      <p>Họ và tên: {profile.name}</p>
      <p>Giới tính: {profile.gender}</p>
      <p>Ngày sinh: {profile.BirthDay}</p>
      <p>Địa chỉ: {profile.address}</p>
    </div>
  );
}
