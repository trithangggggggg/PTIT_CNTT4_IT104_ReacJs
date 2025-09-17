import React, { useEffect, useState } from "react";
import { Table, Button, Form, Modal, Badge } from "react-bootstrap";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  image: string;
  content?: string;
  date: string;
  status: string; // "Đã xuất bản" | "Ngừng xuất bản"
}

export default function ListPost() {
  const [show, setShow] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Partial<Post>>({
    title: "",
    image: "",
    content: "",
    date: "",
    status: "Đã xuất bản",
  });

  // thêm state để phân biệt là đang ở chế độ thêm mới hay cập nhật
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // modal xác nhận chặn/bỏ chặn cho từng bài
  const [showConfirmBlock, setShowConfirmBlock] = useState<boolean>(false);
  const [targetPostForBlock, setTargetPostForBlock] = useState<Post | null>(null);

  // modal cảnh báo (validate or custom message)
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  // modal xác nhận reset inputs
  const [showConfirmReset, setShowConfirmReset] = useState<boolean>(false);

  // modal xác nhận xóa 1 bài
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [targetPostForDelete, setTargetPostForDelete] = useState<Post | null>(null);

  // search
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // loading minimal
  const [loading, setLoading] = useState<boolean>(false);

  const handleClose = () => {
    setShow(false);
    // khi đóng form, reset edit mode
    setIsEditMode(false);
    resetFormState();
  };
  const handleShow = () => {
    setIsEditMode(false);
    setShow(true);
  };

  async function getAllPost() {
    try {
      setLoading(true);
      const response = await axios.get<Post[]>("http://localhost:8080/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Lỗi API:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllPost();
  }, []);

  // helper: set date string in same short format like "17/9" or dd/mm
  function getShortDateString() {
    const d = new Date();
    // dd/m  (như dữ liệu mẫu)
    const day = d.getDate();
    const month = d.getMonth() + 1;
    return `${day}/${month}`;
  }

  // validate form (used both for create and update)
  function validatePostInput(p: Partial<Post>, excludingId?: number): { ok: boolean; message?: string } {
    if (!p.title || !p.title.trim()) {
      return { ok: false, message: "Tên bài viết không được để trống." };
    }
    if (!p.image || !p.image.trim()) {
      return { ok: false, message: "Hình ảnh không được để trống." };
    }
    if (!p.content || !p.content.trim()) {
      return { ok: false, message: "Nội dung bài viết không được để trống." };
    }

    // kiểm tra trùng tên (tên không được trùng, khi sửa cho phép giữ tên cũ)
    const titleLower = p.title.trim().toLowerCase();
    const duplicate = posts.find((x) => x.title.trim().toLowerCase() === titleLower && x.id !== excludingId);
    if (duplicate) {
      return { ok: false, message: "Tên bài viết đã tồn tại. Vui lòng đổi tên khác." };
    }

    return { ok: true };
  }

  // xử lý save mới hoặc cập nhật
  const handleSave = async () => {
    // chuẩn bị dữ liệu
    const payload: Partial<Post> = {
      title: post.title?.trim(),
      image: post.image?.trim(),
      content: post.content?.trim(),
      status: post.status || "Đã xuất bản",
      // nếu chưa có date trên form thì gán date hiện tại short
      date: post.date && post.date !== "" ? post.date : getShortDateString(),
    };

    // validate
    if (isEditMode && typeof post.id === "number") {
      const v = validatePostInput(payload, post.id);
      if (!v.ok) {
        setAlertMessage(v.message || "Dữ liệu không hợp lệ.");
        setShowAlert(true);
        return;
      }

      // PUT (cập nhật)
      try {
        setLoading(true);
        const res = await axios.put<Post>(`http://localhost:8080/posts/${post.id}`, {
          ...payload,
          id: post.id,
        });
        // render lại
        await getAllPost();
        setShow(false);
        setIsEditMode(false);
        resetFormState();
      } catch (error) {
        console.error("Lỗi cập nhật:", error);
        setAlertMessage("Lỗi khi cập nhật bài viết.");
        setShowAlert(true);
      } finally {
        setLoading(false);
      }
    } else {
      // thêm mới
      const v = validatePostInput(payload);
      if (!v.ok) {
        setAlertMessage(v.message || "Dữ liệu không hợp lệ.");
        setShowAlert(true);
        return;
      }

      try {
        setLoading(true);
        // json-server tự sinh id nếu không gửi id
        const res = await axios.post<Post>("http://localhost:8080/posts", payload);
        // cập nhật local list bằng gọi lại getAllPost để đảm bảo đồng bộ
        await getAllPost();
        setShow(false);
        resetFormState();
      } catch (error) {
        console.error("Lỗi tạo mới:", error);
        setAlertMessage("Lỗi khi tạo bài viết mới.");
        setShowAlert(true);
      } finally {
        setLoading(false);
      }
    }
  };

  // handle change inputs (dùng cho cả add và edit)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  // open modal edit với dữ liệu sẵn có
  const handleEdit = (item: Post) => {
    setIsEditMode(true);
    setPost({ ...item }); // copy dữ liệu vào form
    setShow(true);
  };

  // block/unblock: mở modal xác nhận
  const openConfirmBlock = (item: Post) => {
    setTargetPostForBlock(item);
    setShowConfirmBlock(true);
  };

  const closeConfirmBlock = () => {
    setTargetPostForBlock(null);
    setShowConfirmBlock(false);
  };

  // thực hiện chặn/bỏ chặn: gọi API patch để đổi status
  const confirmBlockAction = async () => {
    if (!targetPostForBlock) return;
    const newStatus = targetPostForBlock.status === "Đã xuất bản" ? "Ngừng xuất bản" : "Đã xuất bản";
    try {
      setLoading(true);
      // dùng PATCH để update partial
      await axios.patch(`http://localhost:8080/posts/${targetPostForBlock.id}`, {
        status: newStatus,
      });
      await getAllPost();
      closeConfirmBlock();
    } catch (error) {
      console.error("Lỗi khi đổi trạng thái:", error);
      setAlertMessage("Lỗi khi thay đổi trạng thái bài viết.");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  // delete single post
  const openConfirmDelete = (item: Post) => {
    setTargetPostForDelete(item);
    setShowConfirmDelete(true);
  };
  const closeConfirmDelete = () => {
    setTargetPostForDelete(null);
    setShowConfirmDelete(false);
  };
  const confirmDeleteAction = async () => {
    if (!targetPostForDelete) return;
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8080/posts/${targetPostForDelete.id}`);
      await getAllPost();
      closeConfirmDelete();
    } catch (error) {
      console.error("Lỗi xóa:", error);
      setAlertMessage("Lỗi khi xóa bài viết.");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  // reset form inputs (clear)
  const resetFormState = () => {
    setPost({
      title: "",
      image: "",
      content: "",
      date: "",
      status: "Đã xuất bản",
    });
  };

  // nút "Làm mới" mở modal xác nhận
  const handleOpenConfirmReset = () => {
    setShowConfirmReset(true);
  };
  const handleConfirmReset = () => {
    resetFormState();
    setShowConfirmReset(false);
  };

  // tìm kiếm theo tiêu đề (gọi API)
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);

    // nếu rỗng thì load lại toàn bộ
    if (!keyword || keyword.trim() === "") {
      await getAllPost();
      return;
    }

    // json-server hỗ trợ ?title_like=
    try {
      setLoading(true);
      const res = await axios.get<Post[]>(`http://localhost:8080/posts?title_like=${encodeURIComponent(keyword)}`);
      if (res.data.length === 0) {
        // hiện danh sách rỗng — ta vẫn set posts thành [] để hiển thị "Không có kết quả tìm kiếm"
        setPosts([]);
      } else {
        setPosts(res.data);
      }
    } catch (error) {
      console.error("Lỗi tìm kiếm:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3">
      <h1>Danh sách bài viết</h1>

      <div className="d-flex justify-content-between align-items-center">
        <div>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="me-2"
            value={searchKeyword}
            onChange={handleSearchChange}
          />
          <select
            onChange={async (e) => {
              const val = e.target.value;
              // filter tại client/service bằng gọi API
              if (!val) {
                await getAllPost();
                return;
              }
              // nếu val = published -> Đã xuất bản, draft -> Ngừng xuất bản
              const mapped = val === "published" ? "Đã xuất bản" : "Ngừng xuất bản";
              try {
                setLoading(true);
                const res = await axios.get<Post[]>(`http://localhost:8080/posts?status=${encodeURIComponent(mapped)}`);
                setPosts(res.data);
              } catch (error) {
                console.error("Lỗi filter:", error);
                setPosts([]);
              } finally {
                setLoading(false);
              }
            }}
          >
            <option value="">Lựa chọn</option>
            <option value="published">Đã xuất bản</option>
            <option value="draft">Ngừng xuất bản</option>
          </select>
        </div>

        <div>
          <Button variant="secondary" className="me-2" onClick={getAllPost}>
            Làm mới danh sách
          </Button>
          <Button variant="primary" className="ms-3" onClick={handleShow}>
            Thêm bài viết
          </Button>
        </div>
      </div>

      {/* Modal thêm / cập nhật bài viết */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Cập nhật bài viết" : "Thêm bài viết mới"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên bài viết</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={handleChange}
                name="title"
                placeholder="Nhập tiêu đề..."
                value={post.title || ""}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="examleForm.ContrlInput1">
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control
                type="text"
                onChange={handleChange}
                name="image"
                placeholder="URL hình ảnh..."
                value={post.image || ""}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nội dung bài viết</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="content"
                onChange={handleChange}
                value={post.content || ""}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Select name="status" value={post.status || "Đã xuất bản"} onChange={handleChange}>
                <option value="Đã xuất bản">Đã xuất bản</option>
                <option value="Ngừng xuất bản">Ngừng xuất bản</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>

          <Button variant="outline-secondary" onClick={handleOpenConfirmReset}>
            Làm mới
          </Button>

          <Button
            variant="primary"
            onClick={handleSave}
            disabled={loading}
          >
            {isEditMode ? "Cập nhật" : "Xuất bản"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal xác nhận chặn / bỏ chặn */}
      <Modal show={showConfirmBlock} onHide={closeConfirmBlock}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {targetPostForBlock ? (
            <div>
              Bạn có chắc muốn {targetPostForBlock.status === "Đã xuất bản" ? "chặn" : "bỏ chặn"} bài viết:{" "}
              <strong>{targetPostForBlock.title}</strong> ?
            </div>
          ) : (
            <div>Không có bài viết để xác nhận.</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeConfirmBlock}>
            Hủy
          </Button>
          <Button variant="danger" onClick={confirmBlockAction}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal cảnh báo (validate / lỗi) */}
      <Modal show={showAlert} onHide={() => setShowAlert(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cảnh báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>{alertMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowAlert(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal xác nhận reset inputs */}
      <Modal show={showConfirmReset} onHide={() => setShowConfirmReset(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận làm mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa toàn bộ giá trị trong các input hiện tại?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmReset(false)}>
            Hủy
          </Button>
          <Button variant="danger" onClick={handleConfirmReset}>
            Xóa giá trị
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal xác nhận xóa bài */}
      <Modal show={showConfirmDelete} onHide={closeConfirmDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {targetPostForDelete ? (
            <div>Bạn có chắc muốn xóa bài viết: <strong>{targetPostForDelete.title}</strong> ?</div>
          ) : (
            <div>Không có bài viết để xóa.</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeConfirmDelete}>Hủy</Button>
          <Button variant="danger" onClick={confirmDeleteAction}>Xóa</Button>
        </Modal.Footer>
      </Modal>

      {/* Bảng danh sách */}
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tiêu đề</th>
            <th>Hình ảnh</th>
            <th>Ngày viết</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="text-center">Đang tải...</td>
            </tr>
          ) : posts.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center">Không có kết quả tìm kiếm</td>
            </tr>
          ) : (
            posts.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>
                  <img src={item.image} alt={item.title} width="100" />
                </td>
                <td>{item.date}</td>
                <td>
                  {item.status === "Đã xuất bản" ? (
                    <Badge bg="success">{item.status}</Badge>
                  ) : (
                    <Badge bg="secondary">{item.status}</Badge>
                  )}
                </td>
                <td>
                  <Button
                    variant={item.status === "Đã xuất bản" ? "danger" : "success"}
                    size="sm"
                    className="me-2"
                    onClick={() => openConfirmBlock(item)}
                  >
                    {item.status === "Đã xuất bản" ? "Chặn" : "Bỏ chặn"}
                  </Button>

                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(item)}
                  >
                    Sửa
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    className="me-2"
                    onClick={() => openConfirmDelete(item)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
}
